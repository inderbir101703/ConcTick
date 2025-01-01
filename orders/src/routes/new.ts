import mongoose from 'mongoose'
import {Router, Request,Response} from 'express'
import { BadRequestError, NotFoundError, RequireAuth,ValidateRequest } from '@tiktickets/common'
import { body } from 'express-validator'
import { Ticket } from '../models/ticket'
import { Order, OrderStatus } from '../models/order'
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher'
import { natsWrapper } from '../nats-wrapper'

const router=Router()
const EXPIRATION_WINDOW_SECONDS=1*60
router.post('/api/orders',RequireAuth,[body('ticketId')
    .not()
    .isEmpty()
    .custom((input:string)=> mongoose.Types.ObjectId.isValid(input))
    .withMessage('ticket id must be therw')
],ValidateRequest,async(req:Request,res:Response)=>{
    const {ticketId}=req.body
 //find the ticket user is try to find 
const ticket=await Ticket.findById(ticketId)

if(!ticket){
    throw new NotFoundError()
}
 //make sure ticket is already reserved or not
//run query to all orders. fint the ticket where it same as we founf and status is not cancelled -> otherwise reserved
const isReserved=await ticket.isReserved()

if(isReserved){
    throw new BadRequestError('the ticket is already reserved ')
}

//calculate an expiration time

const expiration = new Date();
expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);


const order =Order.build({
    userId:req.currentUser!.id,
    status:OrderStatus.Created,
    expiresAt:expiration,
    ticket

})

await order.save()
 // build the order and save to db 
 // emit the event and tell other services about it
 new OrderCreatedPublisher(natsWrapper.client).publish({
    id:order.id,
    version:order.version,
    status:order.status,
    userId:order.userId,
    expiresAt:order.expiresAt.toISOString(),
    ticket:{
        id:ticket.id,
        price:ticket.price
    }
 })

    res.status(201).send(order)
})

export {router as newOrderRouter}