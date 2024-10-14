import express from "express";
import { RequireAuth } from "../middleware/requireAuth";

import { CurrentUser } from "../middleware/current-user";
const router=express.Router()

router.get('/api/users/current-user',CurrentUser,RequireAuth,(req,res)=>{
res.send({CurrentUser:req.currentUser||null})
 
})
export {router as currentUserRouter} 