import request from 'supertest'
import { app } from '../../app'
import { Order } from '../../models/order'
import { Ticket } from '../../models/ticket'
import { body } from 'express-validator'


async function createTicket(){
    const ticket = Ticket.build({title:'concert',price:20,    id:'asd'})
    await ticket.save()
    return ticket
}

it('fetches oder from a particular user',async ()=>{
    //create 3 tickets
    const ticketOne=await createTicket()
    const ticketTwo=await createTicket()
    const ticketThree=await createTicket()

    //create one order for user 1 and another one for user2
    let userOne=global.signin()
    let userTwo=global.signin()
     await request(app)
     .post('/api/orders')
     .set('Cookie',userOne)
     .send({ticketId:ticketOne.id})
     .expect(201)

     const {body:orderOne}=await request(app)
     .post('/api/orders')
     .set('Cookie',userTwo)
     .send({ticketId:ticketTwo.id})
     .expect(201)

     const {body:OrderTwo}=await request(app)
     .post('/api/orders')
     .set('Cookie',userTwo)
     .send({ticketId:ticketThree.id})
     .expect(201)
    //make a request to orders for user2 
     const response=await request(app)
     .get('/api/orders')
     .set('Cookie',userTwo)
     .expect(200)
     //make sure these are user 2 
     expect(response.body[0].id).toEqual(orderOne.id)
     expect(response.body[1].id).toEqual(OrderTwo.id)
     expect(response.body[0].ticket.id).toEqual(ticketTwo.id)
     expect(response.body[1].ticket.id).toEqual(ticketThree.id)

})
