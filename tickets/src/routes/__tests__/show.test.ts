const {app}=require('../../app')
const {Ticket} = require('../../models/ticket')
const request = require('supertest');
import { natsWrapper } from "../../nats-wrapper";

it('has a router handler handling /api/tickets for post requests',async()=>{
const response=await request(app).post('/api/tickets').send({})

expect(response.status).not.toEqual(404)
})
it('it can only be accessed if the user is signed in ',async()=>{
    await request(app).post('/api/tickets').send({}).expect(401)

})
it('not send status other than 401 when user is logged in ',async()=>{
   const response= await request(app).post('/api/tickets').send({})
    .set('Cookie',global.signin()) 

    expect(response.status).not.toEqual(401)

})
it('returns error if invalid title is provided',async()=>{
    const response=await request(app).post('/api/tickets').send({
        title:'',
        price:10
    })
    .set('Cookie',global.signin())


    const secondResponse=await request(app).post('/api/tickets').send({
        price:10
    }).set('Cookie',global.signin())

    expect(response.status).not.toEqual(200)
    expect(secondResponse.status).not.toEqual(200)



})
it('returns error if invalid price is entrered',async()=>{
    const response=await request(app).post('/api/tickets').send({
        title:'test',
        price:-10
    })
    .set('Cookie',global.signin())


    const secondResponse=await request(app).post('/api/tickets').send({
        title:'test'
    }).set('Cookie',global.signin())
    
    expect(response.status).not.toEqual(200)
    expect(secondResponse.status).not.toEqual(200)

})
it('tickets is created with valid inputs',async()=>{
let tickets=await Ticket.find({})
expect(tickets.length).toBe(0)

await request(app).post('/api/tickets')
.set('Cookie',global.signin())
.send({title:'asdas',price:100})
.expect(201) 

 tickets=await Ticket.find({})
expect(tickets.length).toBe(1)
expect(tickets[0].price).toBe(100)

})

it('publishes a event',async()=>{
    await request(app).post('/api/tickets')
    .set('Cookie',global.signin())
    .send({title:'asdas',price:100})
    .expect(201) 

expect(natsWrapper.client.publish).toHaveBeenCalled()
     
})