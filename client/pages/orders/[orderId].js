import { useEffect, useState } from 'react';
import useRequest from '../../hooks/useRequest';
import Script from 'next/script';
import Router from 'next/router';
const OrderShow = ({ order,currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { fetchData, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => {},
  });

  const handlePayment = async () => {
  
  console.log( order.ticket.price*100, currentUser.email,order.id)
 let {orderId}=fetchData()
    const options = {
        "key": "rzp_test_Ihl2G01ZxMBmQp", // Enter the Key ID generated from the Dashboard
        "amount": order.ticket.price*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "TikTickets",
        "description": "Test Transaction",
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
   Router.push('/orders')
        },
        "prefill": {
            "name": "inderbir singh",
            "email":currentUser.email,
            "contact": "9592615544"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
  
    const rzp = new window.Razorpay(options);
     rzp.open();

  
    rzp.on('payment.failed', function (response) {
      console.error(response.error);
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
      alert('Payment failed. Please try again.');
    });
  };
  

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);
  if(timeLeft<0)
    return <div>Order expired</div>

  return <div>Time left to pay: {timeLeft} seconds
    {timeLeft>0 && <button  className="btn btn-primary" onClick={handlePayment}>Pay</button>}

   {errors}
   <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => console.log('Razorpay script loaded successfully')}
        onError={(e) => console.error('Failed to load Razorpay script:', e)}
      />
  </div>;
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;