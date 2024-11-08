import express from "express";
import 'express-async-errors'

import cookieSession from "cookie-session";
import { signinRouter } from "./routes/signin";
import { currentUserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { NotFoundError } from "@tiktickets/common";
import { errorHandler } from "@tiktickets/common";


const app=express()
app.set('trust proxy',true)
 app.use(express.json())
 app.use(cookieSession({signed:false,
    secure: process.env.NODE_ENV!=='test'
 }))
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter) 




app.all('*',async ()=>{
    throw new NotFoundError()
})
app.use(errorHandler)

export {app}