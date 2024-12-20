import { Listener, OrderCreatedEvent,Subjects } from "@tiktickets/common";
import { queGroupName } from "./que-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-pubisher";
export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
subject: Subjects.orderCreated=Subjects.orderCreated;
queueGroupName=queGroupName
async onMessage(data:OrderCreatedEvent['data'],msg:Message){
  const ticket=await Ticket.findById(data.ticket.id)  

  if(!ticket)
    throw new Error('ticket not found')

  ticket.set({orderId:data.id})

  await ticket.save()
  await new TicketUpdatedPublisher(this.client).publish({
id:ticket.id  ,
price:ticket.price,
title: ticket.title,
userId:ticket.userId,
version:ticket.version,
orderId:ticket.orderId
})
msg.ack()
}
}