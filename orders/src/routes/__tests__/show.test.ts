import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
import mongoose from 'mongoose'
import { Order, OrderStatus } from '../../models/order'


it('feches the order',async ()=>{
    //create the order
    const ticket = Ticket.build({title:'concert',price:20,     id: new mongoose.Types.ObjectId().toHexString()})
    await ticket.save()
    const user=global.signin()


    //request to build an order with this request

    const {body}=await     request(app)
    .post('/api/orders')
    .set('Cookie',user)
    .send({ticketId:ticket.id})
    .expect(201)

    // make a request to fetch order
    
      const {body:fetchedOrder}= await request(app)
      .get(`/api/orders/${body.id}`)
      .set('Cookie',user)
      .send()
      .expect(200)
      expect(fetchedOrder.id).toEqual(body.id)
})



it('returns error when other user tries to get that ticket',async ()=>{
    //create the order
    const ticket = Ticket.build({title:'concert',price:20,      id: new mongoose.Types.ObjectId().toHexString()})
    await ticket.save()
    const user=global.signin()


    //request to build an order with this request

    const {body}=await     request(app)
    .post('/api/orders')
    .set('Cookie',user)
    .send({ticketId:ticket.id})
    .expect(201)

    // make a request to fetch order
    
await request(app)
      .get(`/api/orders/${body.id}`)
      .set('Cookie',global.signin())
      .send()
      .expect(401)

})