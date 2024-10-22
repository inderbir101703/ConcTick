import request from 'supertest'
import { app } from '../../app'
it('user signsout the cookie is cleared',async()=>{
  await global.signin()

const response=await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200)

    expect(response.headers['set-cookie'][0]).toBe('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')

})