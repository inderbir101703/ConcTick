const {app}=require('../../app')

const request = require('supertest');
import mongoose from "mongoose";



it('returns 404 if ticket is not found',async()=>{
    const id=new mongoose.Types.ObjectId().toHexString()
   const response= await request(app).get(`/api/tickets/${id}`).send().expect(404)
   console.log(response.body,'kiki')
})
it(' retruns the ticket if ticket is found',async()=>{
    let title='concert'
    let price=34
    const response=await request(app).post('/api/tickets')
    .set('Cookie',global.signin()).send({title,price}).expect(201)
    console.log(response.body.id,'huehue')
    const ticketResponse=await request(app).get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200)

    expect(ticketResponse.body.title).toEqual(title)
    expect(ticketResponse.body.price).toEqual(price)
})