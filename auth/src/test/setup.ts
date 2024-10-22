import {MongoMemoryServer} from 'mongodb-memory-server'
import {app} from '../app'
import request from 'supertest'
import mongoose from 'mongoose'
let mongo:any

declare global{
    
var signin:()=>Promise<string>
}
beforeAll(async()=>{
    process.env.JWT_KEY='asfa'
    process.env.NODE_ENV='test'
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
await mongoose.connect(mongoUri)
})

beforeEach(async()=>{
    const collections=await mongoose.connection.db?.collections()
   if(collections){
    for(let collection of collections)
        await collection.deleteMany({})
   }
})

afterAll(async()=>{
await mongo.stop()
await mongoose.disconnect()
})

global.signin=async ()=>{
const response=await request(app)
.post('/api/users/signup')
.send({
    email:'test@test.com',
    password:'password'
})
.expect(201)

return response.headers['set-cookie']

}