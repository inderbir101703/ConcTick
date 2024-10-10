import express, {Request,Response} from "express";
import { body,validationResult } from "express-validator";
const router=express.Router()

router.post('/api/users/signin',[
    body('email').isEmail().withMessage('enter valid emial'),
    body('password').trim().isLength({min:4,max:20}).withMessage('password must between 4 and 20')]
    ,(req:Request,res:Response)=>{
      console.log('jpj')
 
        const errors=validationResult(req)

        if(!errors.isEmpty()){
          throw new Error('invalid email or password') // converting from object to array
        }
    res.send('hi there')
})
export {router as signinRouter} 