
import BuildClient from '../api/buildclient'
const App=(props)=>{

   console.log(props,'loo')
return <h1 className='text-3xl font-bold underline'> {props?.CurrentUser ? 'you are signedin' : 'sign in'} </h1>}


// App.getInitialProps=async function(context) {

//    const client= BuildClient(context)
//    try {
//       const response = await client.get('/api/users/current-user');
//       console.log(response.data, 'huihui', context.req);
      

//       return {
//           currentUser: response.data 
//       };
//     } catch (err) {
//       console.log('Error in getServerSideProps:', err.message);
      
//       return {

//           currentUser: null
        
//       };
//     }
// }
App.getInitialProps = async context => {
   console.log('LANDING PAGEd!',context);
   const client = BuildClient(context);
      try {
            const response = await client.get('/api/users/current-user');      
            return {
             ... response.data 
            };
          }
          catch (err) {
                  console.log('Error in getServerSideProps:', err.message);       
                  return {
                      currentUser: null
                  };
                }

 

 };
export default App