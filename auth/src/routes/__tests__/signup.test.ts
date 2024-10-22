import request from "supertest";
import { app } from "../../app";
import { EmitFlags } from "typescript";

it('returns 201 on successful signup',async()=>{
   await   request(app)
             .post('/api/users/signup')
             .send({
                email:'test@test.com',
                password:'password'
             })
             .expect(201)
})
it('returns 400 on invalid email and password',async()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        password:"sdasdsad"
    })
    .expect(400)
})
it('returns 400 on invalid email and password',async()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        emal:'qwewr@gmail.com',

    })
    .expect(400)
})
it('disallows multiple email and password',async()=>{
    await request(app)
         .post('/api/users/signup')
         .send({
             email:'test@test.com',
             password:'qwertyuiop'
         })
         .expect(201)

         await request(app)
            .post('/api/users/signup')
            .send({email:'test@test.com',password:'qwertyuiop'})
            .expect(409)

})
it('sets cookie after we signup',async()=>{
const response = await request(app).post('/api/users/signup').send({
    email:'test@test.com',
    password:'qwertyuio'
}).expect(201)

expect(response.headers['set-cookie']).toBeDefined()
})