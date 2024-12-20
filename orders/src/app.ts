import express from "express";
import 'express-async-errors'
import cookieSession from "cookie-session";
import { CurrentUser } from "@tiktickets/common";
import { deleteOrderRouter } from "./routes/delete";
import { newOrderRouter } from "./routes/new";
import { indexOrderRouter } from "./routes";
import { showOrderRouter } from "./routes/show";

import { NotFoundError,errorHandler } from "@tiktickets/common";


const app=express()
app.set('trust proxy',true)
 app.use(express.json())
 app.use(cookieSession({signed:false,
    secure: process.env.NODE_ENV!=='test'
 }))
 app.use(CurrentUser)
 console.log('order nai ho rha ')
 app.use(deleteOrderRouter)
 app.use(newOrderRouter)
 app.use(indexOrderRouter)
 app.use(showOrderRouter)




app.all('*',async ()=>{
    throw new NotFoundError()
})
app.use(errorHandler)

export {app}