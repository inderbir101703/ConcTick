import { Publisher,OrderCancelledEvent,Subjects } from "@tiktickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.orderCancelled=Subjects.orderCancelled
}