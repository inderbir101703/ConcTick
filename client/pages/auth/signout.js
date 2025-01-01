import {useEffect, useState} from 'react'
import useRequest from '../../hooks/useRequest'
import Router from 'next/router'
const SignOut=()=>{


 const{fetchData}=useRequest({url:'/api/users/signout',method:'post',body:{
 }, 
onSuccess:()=>Router.push('/')
})
useEffect(()=>{
    fetchData()
},[])

    return <div>...signing you out</div>
}
export default SignOut