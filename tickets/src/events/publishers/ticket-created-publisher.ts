import {Publisher,Subjects,TicketCreatedEvent} from '@tiktickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
subject:Subjects.TicketCreated=Subjects.TicketCreated    
}