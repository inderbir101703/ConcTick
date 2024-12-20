import { Listener, OrderCreatedEvent, Subjects } from "@tiktickets/common";
import { queGroupName } from "./que-group-name";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
subject: Subjects.OrderCreated=Subjects.OrderCreated;
queueGroupName=queGroupName;

async onMessage(data:OrderCreatedEvent['data'],msg:Message){
    const delay=new Date(data.expiresAt).getTime()- new Date().getTime()
    console.log('waiting in queue ',delay)
await expirationQueue.add({
    orderId:data.id
},{
    delay
})
msg.ack()
}
}