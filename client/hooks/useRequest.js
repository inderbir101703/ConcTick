import {useState} from 'react'
import axios from 'axios'
const useRequest=({url,body,method,onSuccess})=>{
  const [error,setError]=useState(null)
  async function fetchData(){
    try{
        setError(null)
const response= await axios[method](url,body)
if(onSuccess){
    console.log(response.data)
    onSuccess(response.data)
}
    return response
    }catch(err){
        console.log(err)
        const errorsArray = err?.response?.data || [
            { message: 'An unexpected error occurred' }
          ];
    setError(<ul>{errorsArray?.map((ele)=><li><h2>{ele.message}</h2>{ele?.field}</li>)} </ul>)
    }
  }

  return {
    error,
    fetchData
  }

}
export default useRequest