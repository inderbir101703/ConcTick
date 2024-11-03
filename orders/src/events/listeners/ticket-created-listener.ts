import {Message} from 'node-nats-streaming'
import { Subjects,Listener,TicketCreatedEvent } from '@tiktickets/common'
import { Ticket } from '../../models/ticket'
import { queueGroupName } from './queue-group-name'
export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    subject: Subjects.TicketCreated=Subjects.TicketCreated
    // queue group name make sures that it send one event for many instances ..it has to be unique..so dont make typos here
    queueGroupName=queueGroupName;
    async onMessage(data:TicketCreatedEvent['data'],msg:Message){
        const {title,price}=data
        const ticket=Ticket.build({title,price,id:data.id})
        await ticket.save()
        msg.ack()
    }

}