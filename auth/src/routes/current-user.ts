import express from "express";
import { RequireAuth } from "@tiktickets/common"

import { CurrentUser } from "@tiktickets/common";
const router=express.Router()

router.get('/api/users/current-user',CurrentUser,RequireAuth,(req,res)=>{
res.send({currentUser:req.currentUser||null})
 
})
export {router as currentUserRouter} 