import express, {Request,Response} from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { body,validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router=express.Router()

router.post('/api/users/signup',[
    body('email').isEmail().withMessage('enter valid emial'),
    body('password').trim().isLength({min:4,max:20}).withMessage('password must between 4 and 20')]
    ,async (req:Request,res:Response)=>{

 
        const errors=validationResult(req)

        if(!errors.isEmpty()){
          throw new RequestValidationError(errors.array()) // converting from object to array
        }
        const {email,password}=req?.body
        const existingUser= await User.findOne({email})
        if(existingUser){
          
         throw new BadRequestError('user already exists')
        }
        const user=User.build({email,password})
        //generate jwt 
 
         const usetJwt=jwt.sign({id:user.id,
          email:user.email
          // adding ! to bypass ts as we know we check this key at start of app in index.js
         },process.env.JWT_KEY!)
    
        //store it on session object
        req.session={jwt:usetJwt}
           await user.save()
          res.status(201).send(user)  
      

       
})
export {router as signupRouter} 