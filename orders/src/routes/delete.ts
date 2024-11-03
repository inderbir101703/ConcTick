import { OrderStatus, RequireAuth } from '@tiktickets/common'
import {Router, Request,Response} from 'express'
import { Order } from '../models/order'
import { NotFoundError,InvalidDetailsError } from '@tiktickets/common'
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher'
import { natsWrapper } from '../nats-wrapper'

const router=Router()

router.delete('/api/orders/:orderId',RequireAuth, async(req:Request,res:Response)=>{
    const order=await Order.findById(req.params.orderId).populate('ticket')
    if(!order)
     throw new NotFoundError()
   if(order.userId!==req.currentUser!.id)
     throw new InvalidDetailsError('invalid user')
   order.status=OrderStatus.Cancelled
   await  order.save()

   new OrderCancelledPublisher(natsWrapper.client).publish({
    id:order.id,
    ticket:{
        id:order?.ticket.id
    }
   })
    res.status(204).send(order)
})

export {router as deleteOrderRouter}