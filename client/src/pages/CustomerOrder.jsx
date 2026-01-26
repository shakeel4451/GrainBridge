import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomerSidebar from "../components/CustomerSidebar";
import PaymentModal from "../components/PaymentModal"; // Import the Payment Modal
import "./CustomerDashboard.css";
import {
  FaShoppingCart,
  FaTimes,
  FaBoxOpen,
  FaPlus,
  FaMinus,
  FaHistory,
} from "react-icons/fa";
import { API_BASE_URL } from "../config";

// Images
import prodBasmati from "../assets/basmati.png";
import prodBrown from "../assets/brown.png";
import prodIrri6 from "../assets/irri-6.png";
import prodKainat from "../assets/kainat.png";

const CustomerOrder = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [qtyInputs, setQtyInputs] = useState({});

  // Payment State
  const [clientSecret, setClientSecret] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Cart State
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getImage = (category) => {
    const cat = category ? category.toLowerCase() : "";
    if (cat.includes("basmati")) return prodBasmati;
    if (cat.includes("organic") || cat.includes("brown")) return prodBrown;
    if (cat.includes("irri") || cat.includes("economy")) return prodIrri6;
    return prodKainat;
  };

  useEffect(() => {
    const initData = async () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) {
        navigate("/login");
        return;
      }
      setUserInfo(user);

      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(
          `${API_BASE_URL}/api/inventory`,
          config,
        );
        const items = Array.isArray(data) ? data : data.items || [];
        setProducts(items);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching market data", err);
        setLoading(false);
      }
    };
    initData();
  }, [navigate]);

  const handleQtyChange = (id, delta) => {
    setQtyInputs((prev) => {
      const currentQty = prev[id] || 1;
      const newQty = Math.max(1, currentQty + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const addToCart = (product) => {
    const selectedQty = qtyInputs[product._id] || 1;
    if (selectedQty > product.quantity) {
      alert(`Only ${product.quantity} bags available!`);
      return;
    }
    const existItem = cart.find((x) => x._id === product._id);
    if (existItem) {
      setCart(
        cart.map((x) =>
          x._id === product._id
            ? { ...existItem, qty: existItem.qty + selectedQty }
            : x,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: selectedQty }]);
    }
    setIsCartOpen(true);
    setQtyInputs((prev) => ({ ...prev, [product._id]: 1 }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((x) => x._id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce(
      (acc, item) => acc + item.qty * (item.pricePerBag || 0),
      0,
    );
  };

  // --- STRIPE PAYMENT FLOW ---
  const initiatePayment = async () => {
    if (cart.length === 0) return;

    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const total = calculateTotal();

      const { data } = await axios.post(
        `${API_BASE_URL}/api/payment/create-intent`,
        { amount: total },
        config,
      );

      setClientSecret(data.clientSecret);
      setShowPaymentModal(true); // Open Modal
      setIsCartOpen(false); // Close Cart
    } catch (error) {
      console.error(error);
      alert("Could not initiate payment. Check server.");
    }
  };

  const handleOrderSuccess = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const orderPayload = {
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.qty,
          priceAtOrder: item.pricePerBag || 0,
        })),
        totalAmount: calculateTotal(),
        shippingAddress: userInfo.address || "Default Address",
        status: "Processing", // Paid -> Processing
      };

      await axios.post(`${API_BASE_URL}/api/orders`, orderPayload, config);

      alert("✅ Payment Successful! Order Placed.");
      setCart([]);
      localStorage.removeItem("cart");
      setShowPaymentModal(false);
      navigate("/customer/history");
    } catch (error) {
      alert("Payment charged, but order creation failed. Contact support.");
    }
  };

  return (
    <div className="customer-layout">
      <CustomerSidebar />
      <main className="customer-content">
        <div className="dashboard-header">
          <h1 className="page-title">
            <FaShoppingCart /> Place New Order
          </h1>
          <div className="cart-trigger" onClick={() => setIsCartOpen(true)}>
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className="badge">
                {cart.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <p>Loading Products...</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="card-image">
                  <img
                    src={getImage(product.category)}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <span className="category-badge">{product.category}</span>
                </div>
                <div className="card-details">
                  <h3>{product.name}</h3>
                  <p className="stock-status">
                    {product.quantity > 0 ? (
                      <span className="in-stock">
                        In Stock: {product.quantity}
                      </span>
                    ) : (
                      <span className="out-stock">Out of Stock</span>
                    )}
                  </p>
                  <div className="price-row">
                    <span className="price">Rs. {product.pricePerBag}</span>
                    <span className="unit">/ 50kg</span>
                  </div>
                  <div className="qty-selector">
                    <button onClick={() => handleQtyChange(product._id, -1)}>
                      <FaMinus size={10} />
                    </button>
                    <span>{qtyInputs[product._id] || 1}</span>
                    <button onClick={() => handleQtyChange(product._id, 1)}>
                      <FaPlus size={10} />
                    </button>
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                    disabled={product.quantity <= 0}
                  >
                    {product.quantity > 0 ? "Add to Cart" : "Sold Out"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>
            <FaTimes />
          </button>
        </div>
        <div className="cart-body">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>
                  Rs. {item.pricePerBag} x {item.qty}
                </p>
              </div>
              <div className="item-actions">
                <span>
                  Rs. {(item.qty * item.pricePerBag).toLocaleString()}
                </span>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>Rs. {calculateTotal().toLocaleString()}</span>
            </div>
            <button className="checkout-btn" onClick={initiatePayment}>
              Secure Checkout
            </button>
          </div>
        )}
      </div>

      {isCartOpen && (
        <div
          className="cart-backdrop"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && clientSecret && (
        <PaymentModal
          clientSecret={clientSecret}
          amount={calculateTotal()}
          onSuccess={handleOrderSuccess}
          onCancel={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default CustomerOrder;
