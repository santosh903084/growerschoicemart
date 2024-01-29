import "../styles/components/orderCard.css";
import { Link } from "react-router-dom";
import axios from 'axios';
export const OrderSuccessCard = ({ paymentId }) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  const sendWhatsAppMessage = async () => {
   // const accountSid = 'AC94f4fa8351c597e546efcb212f613e65';
    //const authToken = 'be570365f588e905a78d85908432f57c';
   // const twilioPhoneNumber = '+19803655930';
    const recipientPhoneNumber = '+919951283914';
    const isMirageEnabled = window.server !== undefined;

    if (isMirageEnabled) {
      // Disable Mirage for this specific request
      window.server.pretender.get('/api/whatsapp/*', () => {
        return new window.server.pretender.Response(404, {}, '');
      });
    }
    const message = `Your order has been confirmed! Order ID: OD${getRandomInt(9999999999)}`;

    try {
      const response = await axios.post('YOUR_WHATSAPP_API_ENDPOINT', {
        phone: recipientPhoneNumber,
        message: message,
      });

      console.log('WhatsApp message sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
    } finally {
      // Re-enable Mirage if it was disabled
      if (isMirageEnabled) {
        window.server.pretender.get('/api/whatsapp/*', window.server.pretender.passthrough);
      }
    }
  };

  sendWhatsAppMessage();
  return (
    <>
      <div className="order-box flex-column">
        <img
          src="https://res.cloudinary.com/dvuh4fz9d/image/upload/v1657615696/check_xyzqdd.png"
          className="success-tick-img"
        />
        <h2 className="text-center">Your Order Has Been Placed Successfully</h2>
        <h2 className="text-center">మీ ఆర్డర్ విజయవంతంగా పూర్తయింది</h2>
        <h3 className="text-center payment-text">
          Order ID: {"OD" + getRandomInt(9999999999)}
        </h3>
        <h3 className="text-center payment-text">Payment: Cash On Delivery {paymentId}</h3>
        <h4 className="text-center email-msg-text">
          You will receive order details soon on your Mobile
        </h4>
        <h4 className="text-center email-msg-text">
        మిగిలిన వివరాలు మీకు మొబైల్‌లో షేర్ చేయబడతాయి
        </h4>

        <Link to="/products" className="btn btn-solid btn-continue-shopping">
          Continue Shopping{" "}
          <i className="material-icons mg-left-xsm">shopping_basket</i>
        </Link>
      </div>
    </>
  );
};