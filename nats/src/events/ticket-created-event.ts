import { Subjects } from "./subjects";
    // goal here is data in tickereventlistener here should ,match the subject
export interface TicketCreatedEvent{
    subject:Subjects.TicketCreated;
    data:{
        id:string;
        title:string;
        price:number;
    }
}