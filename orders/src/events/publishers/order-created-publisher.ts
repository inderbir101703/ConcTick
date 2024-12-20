import { Publisher,OrderCreatedEvent,Subjects } from "@tiktickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated=Subjects.OrderCreated
}