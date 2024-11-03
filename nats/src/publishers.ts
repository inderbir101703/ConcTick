
import nats,{Message} from 'node-nats-streaming'
import {randomBytes} from 'crypto'
import TicketCreatedListener from './events/ticket-created-listener'
import { TicketCreatedPublisher } from './events/ticket-created-publisher'

const stan=nats.connect('ticketing',randomBytes(4).toString('hex'),{
    url:'local'
})

stan.on('connect',async ()=>{
    console.log('listener connected to Nats')

    const publisher=new TicketCreatedPublisher(stan)
    // waiting to getting it published
    try{
    await publisher.publish({
        id:'123',
        title:'concert',
        price:20
    })}
    catch(err){
        console.error(err)
    }
    stan.on('close',()=>{
        console.log('NATS connection closes')
        process.exit()
    })
    new TicketCreatedListener(stan).listen()
})