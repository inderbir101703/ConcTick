import express ,{Request,Response} from 'express'
import { body } from 'express-validator'
import { RequireAuth, OrderStatus, ValidateRequest,InvalidDetailsError, BadRequestError, NotFoundError } from '@tiktickets/common'
import { Order } from '../models/order'
import { razorpay } from '../razorpay'
import { Payment } from '../models/payment'
import { PaymentCreatedEvent } from '@tiktickets/common'
import { natsWrapper } from '../nats-wrapper'
import { PaymentCreatedPublisher } from '../events/listeners/publishers/payment-created-publisher'
const router=express.Router()

router.post('/api/payments',RequireAuth,ValidateRequest,[
    body('orderId')
    .not()
    .isEmpty()

],async (req:Request,res:Response)=>{

const {orderId}=req.body 
const orders = await Order.find();


const order=await Order.findById(orderId)
if(!order){
    throw new NotFoundError()
}
if(order.userId!==req.currentUser!.id){
    throw new InvalidDetailsError('invalid')
}
if(order.status===OrderStatus.Cancelled)
{    throw new BadRequestError('canot pay expired order')
}
var options = {
    amount: order.price*100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    receipt: orderId
  };
   razorpay.orders.create(options,async function(err, order) {
    const payment=Payment.build({orderId,
        razorpayId:order.id
    })
    await payment.save()

     new PaymentCreatedPublisher(natsWrapper.client).publish({
        id:payment.id,
        orderId:payment.orderId,
        razorpayId:payment.razorpayId
      })
      
      res.status(201).send({id:payment.id,orderId:payment.orderId,})

  });


})

export {router as createChargeRouter}