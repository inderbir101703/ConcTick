import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
interface attrs{
    title:string,
    price:number,
    userId:string
}

interface TicketDoc extends mongoose.Document{
    title:string,
    price:number,
    userId:string,
    version:number

}
interface ModelInterface extends mongoose.Model<TicketDoc>{
build(attrs:attrs):TicketDoc
}

const ticketSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    }

},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id;

        }

    }
})
ticketSchema.set('versionKey','version')
ticketSchema.plugin(updateIfCurrentPlugin)
ticketSchema.statics.build=(attrs:attrs)=>{
    return new Ticket(attrs)
}
const Ticket=mongoose.model<TicketDoc,ModelInterface>('Ticket',ticketSchema)

export {Ticket}