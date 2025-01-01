
import {app} from './app'
import mongoose from 'mongoose'
import { natsWrapper } from './nats-wrapper'
import { TicketCreatedListener } from './events/listeners/ticket-created-listener'
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener'
import { PaymentCreatedListener } from './events/listeners/payment-created-listener'
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener'
const start=async ()=>{
    if(!process.env.JWT_KEY)
        throw new Error('JWT_KEY missing')
    if(!process.env.MONGO_URI)
        throw new Error('mongo_db uri is missing')
    if(!process.env.NATS_CLIENT_ID)
        throw new Error('NATS_CLIENT_ID is missing')
    if(!process.env.NATS_URL)
        throw new Error('NATS_URL  is missing')
    if(!process.env.NATS_CLUSTER_ID)
        throw new Error('NATS_CLUSTTER_ID uri is missing')


    //we are gonna connect to  service we creared service name is mongodbauth-srv and port is 27017 where mongo connectionsis 
    // /auth is collection we are gonnna create
    try{
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID,process.env.NATS_CLIENT_ID,process.env.NATS_URL)
        natsWrapper.client.on('close',()=>{
            process.exit()
        })
        process.on('SIGINT',()=>{ natsWrapper.client?.close()})
        process.on('SIGTERM',()=>{ natsWrapper.client?.close()})
        new TicketCreatedListener(natsWrapper.client).listen()
        new TicketUpdatedListener(natsWrapper.client).listen()
        new ExpirationCompleteListener(natsWrapper.client).listen()
        new PaymentCreatedListener(natsWrapper.client).listen()
await mongoose.connect(process.env.MONGO_URI)
console.log('connected to db')
}
catch(error){
    console.error(error)
}
app.listen(3000,()=>{
    console.log('listeing to port numer 3000')
})
}
start()
