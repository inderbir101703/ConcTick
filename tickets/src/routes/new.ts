import { Router, Request, Response  } from "express";
import { body } from "express-validator";
import { RequireAuth,ValidateRequest } from "@tiktickets/common";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";

  const router=Router()

  router.post('/api/tickets',RequireAuth,[body('title').not().isEmpty().withMessage('title not Valid'),body('price')
    .isFloat({gt:0}).withMessage('price is invalid')
  ],ValidateRequest, async(req:Request,res:Response)=>{
const {title,price}=req.body

const ticket= await Ticket.build({
title,
price,
userId:req.currentUser!.id

})
await ticket.save()
new TicketCreatedPublisher(natsWrapper.client).publish({
  id:ticket.id,
  title:ticket.title,
  price:ticket.price,
  userId:ticket.userId,
  version:ticket.version

})
res.status(201).send(ticket)
 
  })

  export {router as CreateNewTicket}
