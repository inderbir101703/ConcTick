
import {app} from './app'
import mongoose from 'mongoose'
const start=async ()=>{
    if(!process.env.JWT_KEY)
        throw new Error('JWT_KEY missing')
    if(!process.env.MONGO_URI)
        throw new Error('MONGO_URI for auth missing')
    //we are gonna connect to  service we creared service name is mongodbauth-srv and port is 27017 where mongo connectionsis 
    // /auth is collection we are gonnna create
    try{
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
