
import {app} from './app'
import mongoose from 'mongoose'
import { natsWrapper } from './nats-wrapper'
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener'
import { OrderCreatedListener } from './events/listeners/order-created-listener'
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
        new OrderCreatedListener(natsWrapper.client).listen()
        new OrderCancelledListener(natsWrapper.client).listen()
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
