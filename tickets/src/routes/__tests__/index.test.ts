import request from 'supertest'
import { app } from '../../app'

const createTicket=()=>{
    return request(app).post('/api/tickets')
    .set('Cookie',global.signin()).send({title:'test',price:13})
}
it('get all entries ',async()=>{
await createTicket()
await createTicket()
await createTicket()
const response=await request(app).get('/api/tickets').send()

expect(response.body.length).toBe(3)
})