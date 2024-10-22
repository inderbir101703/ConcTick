import request from "supertest";
import { app } from "../../app";
it('user do not exist in db ',async()=>{
await request(app)
      .post('/api/users/signin')
      .send({email:'tesst@test.com',password:'password'})
      .expect(409)
})

it('user enter wrong credentials',async()=>{
    await global.signin()
    
    await request(app)
          .post('/api/users/signin')
          .send({email:'tesst@test.com',password:'wrongpass'})
          .expect(409)
    })

    it('user enter corect credentials',async()=>{
        await global.signin()
        
        const response=await request(app)
              .post('/api/users/signin')
              .send({email:'test@test.com',password:'password'})
              .expect(200)

             expect(response.headers['set-cookie']).toBeDefined() 


        })
