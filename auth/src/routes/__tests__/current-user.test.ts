import request from 'supertest'
import { app} from '../../app'

it('check the current user',async ()=>{

         const cookie=await global.signin()

    const responseTwo= await request(app)
       .get('/api/users/current-user')
       .set('cookie',cookie)
       .send()
       .expect(200)

       expect(responseTwo.body.CurrentUser.email).toBe('test@test.com')
       



})
