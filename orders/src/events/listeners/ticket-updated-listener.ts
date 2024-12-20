import {Message} from 'node-nats-streaming'
import { Subjects,Listener, TicketUpdatedEvent } from '@tiktickets/common'
import { Ticket } from '../../models/ticket'
import { queueGroupName } from './queue-group-name'
export class TicketUpdatedListener extends Listener<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated=Subjects.TicketUpdated
    // queue group name make sures that it send one event for many instances ..it has to be unique..so dont make typos here
    queueGroupName=queueGroupName;
    async onMessage(data:TicketUpdatedEvent['data'],msg:Message){
        const ticket=await Ticket.findByEvent(data)
    console.log('TTicket lost ho gayi ',data,ticket)
        if(!ticket){ 
            throw new Error('Ticket Not Found')
        }
      const {title,price}=data
        ticket.set({title,price})
        await ticket.save()
        msg.ack()
    }

}