import {Router, Request,Response} from 'express'
import { InvalidDetailsError, NotFoundError, RequireAuth } from '@tiktickets/common'
import { Order } from '../models/order'
const router=Router()

router.get('/api/orders/:orderId',RequireAuth,async (req:Request,res:Response)=>{
   const order=await Order.findById(req.params.orderId).populate('ticket')
   if(!order)
    throw new NotFoundError()
  if(order.userId!==req.currentUser!.id)
    throw new InvalidDetailsError('invalid user')

  res.send(order)
})

export {router as showOrderRouter}