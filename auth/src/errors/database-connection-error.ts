
import { CustomError } from "./custom-error";
export class DatabaseConnectionError extends CustomError{
    statusCode=500
    reason = ' error conencting to db'
    constructor(){
        super('error connecting to db')

    }
    serializeErrors(){
        return [{message:this.reason}]
    }
}
