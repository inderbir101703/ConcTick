import {Request,Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { Password } from '../services/Password'

interface UserPayload{
    email:string
    id:string
}

// how we set a type in already declared objects
declare global{
    namespace Express{
        interface Request{
            currentUser?:UserPayload
        }
    }
}

export const CurrentUser=(req:Request,res:Response,next:NextFunction)=>{

    if(!req.session?.jwt){
        return next()
      }
      try{
          const payload=jwt.verify(req.session?.jwt,process.env.JWT_KEY!) as UserPayload
         req.currentUser=payload
  
      }
      catch(error){
      }


    next()
}