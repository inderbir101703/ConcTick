import express from "express";
import 'express-async-errors'
import cookieSession from "cookie-session";
import { CurrentUser } from "@tiktickets/common";
import { CreateNewTicket } from "./routes/new";
import { Showrouter } from "./routes/show";
import { GetAllTickets } from "./routes";
import { UpdateTicket } from "./routes/update";
import { NotFoundError,errorHandler } from "@tiktickets/common";


const app=express()
app.set('trust proxy',true)
 app.use(express.json())
 app.use(cookieSession({signed:false,
    secure: process.env.NODE_ENV!=='test'
 }))
 app.use(CurrentUser)
 app.use(CreateNewTicket)
 app.use(Showrouter)
 app.use(GetAllTickets)
 app.use(UpdateTicket)




app.all('*',async ()=>{
    throw new NotFoundError()
})
app.use(errorHandler)

export {app}