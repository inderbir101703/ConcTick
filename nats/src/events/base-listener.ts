
import nats,{Stan,Message} from 'node-nats-streaming'
import { Subjects } from './subjects';

interface Event{
    subject:Subjects;
    data:any
}
abstract class Listener<T extends Event>{
    abstract subject:T['subject']
    abstract queueGroupName:string
    private client:Stan;
    protected ackWait=5*1000

    abstract onMessage(data:T['data'],message:Message):void

    constructor(client:Stan){
        this.client=client
    }

    subscriptionoptions(){
        return this.client
              .subscriptionOptions()
              .setDeliverAllAvailable()
              .setManualAckMode(true)
              .setAckWait(this.ackWait)
              .setDurableName(this.queueGroupName)
    }

    listen(){
        const subscription=this.client.subscribe(this.subject,this.queueGroupName,this.subscriptionoptions())

        subscription.on('message',(msg:Message)=>{
            console.log(`message recieved ${this.subject} ${this.queueGroupName}`)
           const parsedData=this.parseData(msg)  
           this.onMessage(parsedData,msg)
        })
    }

    parseData(msg:Message){
        const data=msg.getData()
        return typeof data ==='string' ? JSON.parse(data): JSON.parse(data.toString('utf8'))

    }


}
export default Listener

