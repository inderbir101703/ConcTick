import express, {Request,Response} from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { Password } from "../services/Password";
import { BadRequestError } from "@tiktickets/common";
import { ValidateRequest } from "@tiktickets/common";
const router=express.Router()

router.post('/api/users/signin',[body('email').isEmail().withMessage('enter email'),body('password').trim().notEmpty().withMessage('must enter the password')]
    ,
    ValidateRequest,
    async (req:Request,res:Response)=>{
      const {email ,password}=req.body
      const exisitingUser=await User.findOne({email})

      if(!exisitingUser){
       throw new BadRequestError('invalid details')
      }
      const passwordMatch=await Password.compareHash(exisitingUser.password,password)

      if(!passwordMatch)
        throw new BadRequestError('invalid details')

      const usetJwt=jwt.sign({id:exisitingUser.id,
        email:exisitingUser.email
        // adding ! to bypass ts as we know we check this key at start of app in index.js
       },process.env.JWT_KEY!)
  
      //store it on session object
      req.session={jwt:usetJwt}
         await exisitingUser.save()
        res.status(200).send(exisitingUser)  

  

})
export {router as signinRouter} 