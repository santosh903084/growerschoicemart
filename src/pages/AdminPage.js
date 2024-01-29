// AdminPage.js
import { useEffect, useState } from 'react';
import { database } from '../firebase';
import './AdminPage.css'; // Import the CSS file
//import backgroundImg from '../image2.jpg';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { toast } from "react-toastify";
//import { Navbar, Footer } from "../components/allComponents";

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [hoveredOrderId, setHoveredOrderId] = useState(null);
  const [hoveredOrderDetails, setHoveredOrderDetails] = useState(null);
 // const [counter, setCounter] = useState(1);

 
    // Fetch orders from Firebase
    const fetchOrders = async () => {
      try {
        const ordersSnapshot = await database.ref('orders').once('value');
        const ordersData = ordersSnapshot.val();
        const ordersArray = ordersData ? Object.values(ordersData) : [];
        setOrders(ordersArray);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error("Order Fetching failed!");
      }
    };
    useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      // Remove the order from the 'orders' node in the database
      await database.ref(`orders/${orderId}`).remove();

      // Update the state to reflect the deletion
      setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
      toast.success("Order Delivered Successfully!");
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error("Order Cannot be delivered");
    }
  };
  const handleOrderHover = async (orderId) => {
    try {
      // Fetch cart items details for the hovered order ID
      const orderDetailsSnapshot = await database.ref(`orders/${orderId}/cartItems`).once('value');
      const cartItemsDetails = orderDetailsSnapshot.val();

      // Assuming cartItemsDetails is an array
      const formattedCartItems = cartItemsDetails
        ? Object.values(cartItemsDetails).map((item, index) => ({
            index,
            productName: item.title,
            // Add other properties as needed
          }))
        : [];

      console.log('formattedCartItems:', formattedCartItems); // Add this line for debugging

      setHoveredOrderDetails(formattedCartItems);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };
  
  
  const handleMouseEnter = (orderId) => {
    setHoveredOrderId(orderId);
    handleOrderHover(orderId);
  };

  const handleMouseLeave = () => {
    setHoveredOrderId(null);
    setHoveredOrderDetails(null);
  };  
  return (
    
    <div className="admin-page-container">
    <h2>Admin Page - Orders</h2>
    <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total Price</th>
            <th>Delivery Charge</th>
            <th>Total Amount</th>
            <th>Order Placed At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {orders.map((order) => (
    <tr key={order.orderId}>
      <td
        onMouseEnter={() => handleMouseEnter(order.orderId)}
        onMouseLeave={handleMouseLeave}
      >
        {order.orderId}
      </td>
      <td>{order.totalPrice}</td>
      <td>{order.deliveryCharge}</td>
      <td>{order.totalAmount}</td>
      <td>{order.orderPlacedAt}</td>
      <td>
        <button
          className="admin-deliver-button"
          onClick={() => handleDeleteOrder(order.orderId)}
        >
          Deliver
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
      {hoveredOrderId && hoveredOrderDetails && (
        <div className="tooltip">
          <h3>Cart Items Details for Order ID: {hoveredOrderId}</h3>
          <ul>
            {Object.values(hoveredOrderDetails).map((item) => (
              <li key={item.index}>{`${item.productName} (Id: ${item.index})`}</li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/" className="redirect-button">
        Go to Home
      </Link>
    </div>
  );
};
export default AdminPage;