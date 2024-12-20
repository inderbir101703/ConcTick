
import { natsWrapper } from './nats-wrapper'
import { OrderCreatedListener } from './events/listeners/order-created-listener'
const start=async ()=>{

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
}
catch(error){
    console.error(error)
}

}
start()
