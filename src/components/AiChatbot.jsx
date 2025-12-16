import React, { useState, useRef, useEffect } from "react";
import "./AiChatbot.css";
import { FaRobot, FaPaperPlane, FaTimes, FaMicrophone } from "react-icons/fa";

const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Chat Data
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am GrainBot. How can I help you today? Ask about prices or tracking.",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Toggle Chat function
  const toggleChat = () => setIsOpen(!isOpen);

  // ================= SEND LOGIC =================
  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg = { id: Date.now(), text: inputText, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse =
        "I am currently in simulation mode. Connect me to OpenAI to make me smart!";
      const lowerInput = userMsg.text.toLowerCase();

      if (lowerInput.includes("price") || lowerInput.includes("rate")) {
        botResponse =
          "Today's rate for Super Kernel Basmati is Rs. 11,800/40kg.";
      } else if (lowerInput.includes("track") || lowerInput.includes("order")) {
        botResponse = "Please provide your Order ID to track your shipment.";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        botResponse =
          "Salam! Welcome to GrainBridge. Are you a Farmer or a Customer?";
      }

      const botMsg = { id: Date.now() + 1, text: botResponse, sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-wrapper">
      {/* Chat Window */}
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
              <div className="message-bubble">{msg.text}</div>
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
            placeholder="Type a message..."
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

      {/* Floating Toggle Button */}
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
