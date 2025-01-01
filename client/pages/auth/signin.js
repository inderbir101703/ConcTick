import {useState} from 'react'
import useRequest from '../../hooks/useRequest'
import Router from 'next/router'
const Signin=()=>{
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

 const{fetchData,errors}=useRequest({url:'/api/users/signin',method:'post',body:{
  email:email,
  password:password
 }, 
onSuccess:()=>Router.push('/')
})


  const handleSubmit=async (e)=>{
    
    e.preventDefault()
    fetchData()

  }
    return <div className='w-full max-w-full' >
      
       <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-4 mb-4  w-3/6 m-auto mt-20 flex flex-col'>
        <h1 className='mb-6'>Sign IN</h1>
        <div className='mb-4'>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
    <input type="email" id="email" className='class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'  name="email" value={email} onChange={(e)=>{
setEmail(e.target.value)
    }}/>
    </div>
    <div className='mb-6'>
    <label htmlFor ="password" className='block text-gray-700 text-sm font-bold mb-2'>Enter the password</label>
    <input type="password" id="password" name="password" className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' value={password} onChange={(e)=>{
      setPassword(e.target.value)
    }}/>
    </div>

{errors}
    <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-3/6 self-center'>Sign in</button>
    </form>
    </div>
}
export default Signin