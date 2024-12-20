import { Listener,Subjects,ExpirationCompleteEvent,OrderStatus } from "@tiktickets/common";
import {Message} from 'node-nats-streaming'
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{

queueGroupName: string=queueGroupName;
subject: Subjects.ExpirationComplete=Subjects.ExpirationComplete;
async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order=await Order.findById(data.orderId)

    if(!order){
        throw new Error('order not found')
    }
    order.set({
        status:OrderStatus.Cancelled
    })
    await order.save()

    // tell the world that order is cancelled
    await new OrderCancelledPublisher(this.client).publish({
        id:order.id,
        version:order.version,
        ticket:{
            id:order.ticket.id
        }
    })

msg.ack()

}
}