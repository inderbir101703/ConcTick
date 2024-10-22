import express, {Request,Response} from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { ValidateRequest } from "../middleware/validate-request";

const router=express.Router()

router.post('/api/users/signup',[
    body('email').isEmail().withMessage('enter valid emial'),
    body('password').trim().isLength({min:4,max:20}).withMessage('password must between 4 and 20')],
    ValidateRequest
    ,async (req:Request,res:Response)=>{


        const {email,password}=req?.body
        const existingUser= await User.findOne({email})
        console.log('existing user',existingUser)
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