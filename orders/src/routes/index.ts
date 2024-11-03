import {Router, Request,Response} from 'express'
import { Order } from '../models/order'
import { RequireAuth } from '@tiktickets/common'

const router=Router()

router.get('/api/orders',RequireAuth,async(req:Request,res:Response)=>{
    const orders=await Order.find({userId:req.currentUser!.id}).populate('ticket')
    res.send(orders)
})

export {router as indexOrderRouter}