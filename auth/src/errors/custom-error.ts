export abstract class CustomError extends Error{
 abstract statusCode: number
 constructor(public message:string){
    super(message) // this means new Error(meesage)
    Object.setPrototypeOf(this,CustomError.prototype)
 }
abstract serializeErrors(): {message:String,field?:string}[]
}