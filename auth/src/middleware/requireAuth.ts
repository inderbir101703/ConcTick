import { Request,Response,NextFunction } from "express"
import { InvalidDetailsError } from "../errors/invalid-details-error"
export const RequireAuth=(req:Request,res:Response,next:NextFunction)=>{

if(!req.currentUser)
    throw new InvalidDetailsError('invalid setails')

next()
}