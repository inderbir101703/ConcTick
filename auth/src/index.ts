import express from "express";
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from "cookie-session";
import { signinRouter } from "./routes/signin";
import { currentUserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middleware/error-handler";


const app=express()
app.set('trust proxy',true)
 app.use(express.json())
 app.use(cookieSession({signed:false,
    secure:true
 }))
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter) 



app.all('*',async ()=>{
    throw new NotFoundError()
})
app.use(errorHandler)

const start=async ()=>{
    if(!process.env.JWT_KEY)
        throw new Error('JWT_KEY missing')
    //we are gonna connect to  service we creared service name is mongodbauth-srv and port is 27017 where mongo connectionsis 
    // /auth is collection we are gonnna create
    try{
await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
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
