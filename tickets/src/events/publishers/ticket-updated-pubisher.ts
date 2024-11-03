import {Publisher,Subjects,TicketUpdatedEvent} from '@tiktickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
subject:Subjects.TicketUpdated=Subjects.TicketUpdated    
}