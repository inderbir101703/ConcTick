import { Response,Request,NextFunction } from "express"
import jwt from "jsonwebtoken"
import { CustomError } from "./custom-error"
export class InvalidDetailsError extends CustomError{
 statusCode=401
 constructor(public message:string){
    super(message)
    Object.setPrototypeOf(this,InvalidDetailsError.prototype)
 }
 serializeErrors(): { message: String; field?: string; }[] {
     return [{message:this.message}]
 }
}