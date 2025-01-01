import {MongoMemoryServer} from 'mongodb-memory-server'
import {app} from '../app'
import request from 'supertest'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
let mongo:any

declare global{
    
    var signin: (id?:string) => string[];
}

jest.mock('../nats-wrapper')
beforeAll(async()=>{
    jest.clearAllMocks()
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

global.signin= (id?:String)=>{
// build a jwt with payload id and email
const payload={email:'test@test.com',
    id: id || new mongoose.Types.ObjectId().toHexString()
}


//create the jwt
const token=jwt.sign(payload,process.env.JWT_KEY!)

//build session object
const session={jwt:token}

//turn in to json
const sessionJSON=JSON.stringify(session)

//take json and encode in base674
const base64=Buffer.from(sessionJSON).toString('base64')
return [`session=${base64}`]
}