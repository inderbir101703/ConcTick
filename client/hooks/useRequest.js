import {useState} from 'react'
import axios from 'axios'
const useRequest=({url,body,method,onSuccess})=>{
  const [errors,setErrors]=useState(null)
  async function fetchData(){
    try{
        setErrors(null)
const response= await axios[method](url,body)
if(onSuccess){
    console.log(response.data)
    onSuccess(response.data)
}
    return response
    }catch(err){
        console.log(err.response,'lllll')
        const errorsArray = err?.response?.data || [
            { message: 'An unexpected error occurred' }
          ];
    setErrors(<ul>{errorsArray?.map((ele)=><li><h2>{ele.message}</h2>{ele?.field}</li>)} </ul>)
    }
  }

  return {
    errors,
    fetchData
  }

}
export default useRequest