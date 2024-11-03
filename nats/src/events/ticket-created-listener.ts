import Listener from "./base-listener"
import nats,{Message} from 'node-nats-streaming'
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    subject:Subjects.TicketCreated=Subjects.TicketCreated;
    // goal here is data present here should ,match the subject
    queueGroupName= 'payments-service';
    onMessage(data: TicketCreatedEvent['data'], message: Message): void {

       message.ack()
    }
}
export default TicketCreatedListener