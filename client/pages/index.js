import Link from "next/link";

const LandingPage = ({ currentUser, tickets }) => {
   const ticketList = tickets.map((ticket) => {
     return (
       <tr key={ticket.id}>
         <td>{ticket.title}</td>
         <td>{ticket.price}</td>
         <td>
            <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            View
          </Link></td>
       </tr>
     );
   });
 
   return (
     <div>
       <h1>Tickets</h1>
       <table className="table">
         <thead>
           <tr>
             <th>Title</th>
             <th>Price</th>
             <th>Link</th>
           </tr>
         </thead>
         <tbody>{ticketList}</tbody>
       </table>
     </div>
   );
 };

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
LandingPage.getInitialProps = async (context,client,currentUser) => {
const {data}=await client.get('/api/tickets');
 
return {tickets:data}
 };
export default LandingPage