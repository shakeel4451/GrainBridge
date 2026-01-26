import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Import Axios
import { API_BASE_URL } from "../config"; // Import Config
import "./AiChatbot.css";
import { FaRobot, FaPaperPlane, FaTimes, FaMicrophone } from "react-icons/fa";

const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Salam! I am GrainBot 🤖. Ask me about rice prices, stock availability, or tracking.",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Cache inventory for quick answers
  const [inventory, setInventory] = useState([]);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch Inventory on Load (So the bot knows prices)
  useEffect(() => {
    const fetchContext = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/inventory`);
        setInventory(data);
      } catch (err) {
        console.error("Bot failed to learn inventory");
      }
    };
    fetchContext();
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  // --- THE BRAIN OF THE BOT ---
  const generateResponse = (input) => {
    const lowerInput = input.toLowerCase();

    // 1. GREETINGS
    if (
      lowerInput.includes("hello") ||
      lowerInput.includes("hi") ||
      lowerInput.includes("salam")
    ) {
      return "Walaikum Assalam! How can I help you with your rice business today?";
    }

    // 2. PRICE QUERIES (Dynamic from DB)
    if (
      lowerInput.includes("price") ||
      lowerInput.includes("rate") ||
      lowerInput.includes("cost")
    ) {
      // Check if they mentioned a specific rice
      const foundItem = inventory.find((item) =>
        lowerInput.includes(item.name.toLowerCase()),
      );

      if (foundItem) {
        return `The current rate for ${foundItem.name} is Rs. ${foundItem.pricePerBag} per bag.`;
      } else {
        // List all prices
        return (
          "Here are our latest market rates:\n" +
          inventory.map((i) => `• ${i.name}: Rs. ${i.pricePerBag}`).join("\n")
        );
      }
    }

    // 3. STOCK QUERIES
    if (lowerInput.includes("stock") || lowerInput.includes("available")) {
      const foundItem = inventory.find((item) =>
        lowerInput.includes(item.name.toLowerCase()),
      );
      if (foundItem) {
        return foundItem.quantity > 0
          ? `Yes, we have ${foundItem.quantity} bags of ${foundItem.name} available.`
          : `Sorry, ${foundItem.name} is currently out of stock.`;
      }
      return (
        "We have stock available for: " +
        inventory.map((i) => i.name).join(", ")
      );
    }

    // 4. TRACKING
    if (lowerInput.includes("track") || lowerInput.includes("order")) {
      return "To track an order, please visit the 'Track Shipment' page in your Customer Dashboard and enter your Order ID.";
    }

    // 5. CONTACT
    if (
      lowerInput.includes("contact") ||
      lowerInput.includes("location") ||
      lowerInput.includes("phone")
    ) {
      return "You can reach us at +92 300 1234567 or visit our mill in Gujranwala Industrial Zone.";
    }

    // FALLBACK
    return "I am trained to answer questions about Rice Prices and Inventory. Please ask me about 'Basmati Price' or 'Stock Levels'.";
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add User Message
    const userMsg = { id: Date.now(), text: inputText, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI Thinking Delay
    setTimeout(() => {
      const responseText = generateResponse(userMsg.text);
      const botMsg = { id: Date.now() + 1, text: responseText, sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-wrapper">
      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <div className="header-info">
            <FaRobot />
            <h3>GrainBot AI</h3>
          </div>
          <button onClick={toggleChat} className="close-btn">
            <FaTimes />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div
                className="message-bubble"
                style={{ whiteSpace: "pre-line" }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot">
              <div className="message-bubble typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Ask about prices..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="voice-btn">
            <FaMicrophone />
          </button>
          <button className="send-btn" onClick={handleSend}>
            <FaPaperPlane />
          </button>
        </div>
      </div>

      <button
        className={`chatbot-toggle ${isOpen ? "hide" : ""}`}
        onClick={toggleChat}
      >
        <FaRobot className="toggle-icon" />
        <span className="toggle-text">Ask AI</span>
      </button>
    </div>
  );
};

export default AiChatbot;
