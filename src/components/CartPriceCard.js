import { useCart } from "../context/cart-context";
import { Link,  useLocation, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { useAddress } from "../context/address-context";
//import { clearCart } from "../services/cartServices";
//import { useAuth } from "../context/auth-context";
//import { useState } from "react"; // Import useState from React
import { database } from "../firebase";

export const CartPriceCard = () => {
  const { cartState } = useCart();
  const location = useLocation();
  const { addressState } = useAddress();
  const navigate = useNavigate(); // Add this line
 // const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  function totalPrice() {
    let collectPrice = 0;
    cartState.cartItems.map(
      (item) => (collectPrice = collectPrice + item.price * item.quantity)
    );
    return collectPrice;
  }
  function totalOldPrice() {
    let collectOldPrice = 0;
    cartState.cartItems.map(
      (item) =>
        (collectOldPrice = collectOldPrice + item.price_old * item.quantity)
    );
    return collectOldPrice;
  }

  const deliveryCharge = () => (totalPrice() > 10 ? 0 : 100);


  const handlePayment = async () => {
    if (addressState.addressList.length > 0 && addressState.addressSelectedId) {
      // Store order details in Firebase Realtime Database
      const selectedAddress = addressState.addressList.find(
        (address) => address.id === addressState.addressSelectedId
      );
  
      if (selectedAddress) {
        // Store order details in Firebase Realtime Database
        const orderDetails = {
          cartItems: cartState.cartItems,
          totalPrice: totalPrice(),
          deliveryCharge: deliveryCharge(),
          totalAmount: totalPrice() + deliveryCharge(),
          orderPlacedAt: new Date().toISOString(),
          address: selectedAddress, // Use the fetched address details
        };
  
        const newOrderRef = database.ref("orders").push();
        const orderId = newOrderRef.key;
        await newOrderRef.set({ ...orderDetails, orderId });
  
        // Clear the cart
        // clearCart();
  
        toast.success("Order Placed Successfully");
        navigate("/order-success");
      } else {
        toast.error("Invalid address selected");
      }
    } else {
      addressState.addressList.length === 0
        ? toast.error("Please Add address")
        : toast.error("Please Select Delivery Address");
    }
  };

  return (
    <>
      <div className="price-summary">
        <h3 className="fw-bold mg-xsm">Price Details</h3>
        <hr />
        <div className="original-price price-item align-center mg-xsm fw-bold">
          <h4>Price ({cartState.cartItems.length} Items)</h4>
          <p className="para-md">₹{totalOldPrice()}</p>
        </div>
        <div className="discount-price price-item align-center mg-xsm fw-bold">
          <h4>Discount</h4>
          <p className="para-md">- ₹{totalOldPrice() - totalPrice()}</p>
        </div>
        <div className="delivery-charges price-item align-center mg-xsm fw-bold">
          <h4>Delivery Charge</h4>
          <p className="para-md">₹{deliveryCharge()}</p>
        </div>
        <hr />
        <div className="total-amount price-item flex align-center mg-xsm">
          <h4>Total Amount</h4>
          <p className="para-md">₹{totalPrice() }</p>
        </div>
        <hr />

        <p className="note fw-bold mg-xsm">
          You will save ₹{totalOldPrice() - totalPrice()} on this order
        </p>
        <p className="note-free-delivery fw-bold mg-xsm">
          FREE Home Delivery on all orders within same village. 
        </p>
        <p className="note-free-delivery fw-bold mg-xsm">
        ఒకే గ్రామంలోని అన్ని ఆర్డర్‌లపై ఉచిత హోమ్ డెలివరీ.
        </p>

        {location.pathname == "/cart" ? (
          <Link
            to="/checkout"
            className="btn btn-solid fw-bold btn-place-order align-center"
          >
            PROCEED TO CHECKOUT
          </Link>
        ) : (
          <a
            className="btn btn-solid fw-bold btn-place-order align-center btn-payment"
            onClick={handlePayment}
          >
            CONFIRM ORDER
          </a>
        )}
      </div>
    </>
  );
};
