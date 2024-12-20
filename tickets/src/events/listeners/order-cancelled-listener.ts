import { Listener , OrderCancelledEvent,Subjects} from "@tiktickets/common";
import { Message } from "node-nats-streaming";
import { queGroupName } from "./que-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-pubisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
subject: Subjects.orderCancelled=Subjects.orderCancelled
queueGroupName: string=queGroupName
async onMessage(data:OrderCancelledEvent['data'],msg:Message){
const ticket = await Ticket.findById(data.ticket.id)

if(!ticket)
    throw new Error('not found ticker')

ticket.set({orderId:undefined})
await ticket.save()
await new TicketUpdatedPublisher(this.client).publish({id:ticket.id,
    orderId:ticket.orderId,
    userId:ticket.userId,
    price:ticket.price,
    title:ticket.title,
    version:ticket.version
})
}
}