import '../global.css'
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../components/header'
import BuildClient from '../api/buildclient'
const AppComponent =({Component , pageProps,currentUser})=>{

    return <>

      <Header currentUser={currentUser}/>
      <div className='container'>
    <Component currentUser={currentUser} {...pageProps}/>
    </div>
    </>
}
AppComponent.getInitialProps=async function(appContext){

const client=BuildClient(appContext.ctx)
const response=await client.get('/api/users/current-user').catch((e)=>console.log(e))
let pageProps={}
if(appContext.Component.getInitialProps)
 pageProps=await appContext.Component.getInitialProps(appContext.ctx,client,response?.data?.currentUser);
return {
   pageProps,
    ...response?.data 

  };
}
export default AppComponent