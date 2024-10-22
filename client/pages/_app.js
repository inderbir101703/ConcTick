import '../global.css'
import Header from '../components/header'
import BuildClient from '../api/buildclient'
const AppComponent =({Component , pageProps,CurrentUser})=>{
    console.log('app componet',CurrentUser,pageProps)
    return <div>
      <Header CurrentUser={CurrentUser}/>
    <Component {...pageProps}/>
    </div>
}
AppComponent.getInitialProps=async function(appContext){
    console.log('app context:',appContext)
const client=BuildClient(appContext.ctx)
const response=await client.get('/api/users/current-user').catch((e)=>console.log(e))
let pageProps={}
if(appContext.Component.getInitialProps)
 pageProps=await appContext.Component.getInitialProps(appContext.ctx)
return {
   pageProps,
    ...response?.data 

  };
}
export default AppComponent