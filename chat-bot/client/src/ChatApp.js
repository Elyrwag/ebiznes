import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatApp = () => {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/start')
            .then(res => {
                setChatHistory(prev => [...prev, { role: "bot", message: res.data.response }]);
            })
            .catch(err => console.error('Error fetching hello message:', err));

    }, []);

    const addToChat = (role, message) => {
        setChatHistory((prev) => [...prev, { role, message }]);
    };

    const sendMessage = () => {
        if (!userInput.trim()) return;

        addToChat("user", userInput);
        setUserInput("");

        axios.post("http://localhost:5000/chat", { user_input: userInput })
            .then(res => {
                addToChat("bot", res.data.response);
            })
            .catch(error => {
                console.error("Error fetching chat response: ", error);
                addToChat("bot", "Wystąpił problem z połączeniem.");
            });
    };

    return (
        <div style={{ height: "95vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px" }}>
            <h2>Chat sklepu</h2>
            <div id="chat-box" style={{ whiteSpace: "pre-wrap", width: "95vw", padding: "10px", overflowY: "auto",
                flexGrow: "1", marginBottom: "10px" }}>
                {chatHistory.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.role === "bot" ? "Bot" : "Ty"}:</strong> {msg.message}
                    </p>
                ))}
            </div>
            <input type="text" id="user-input" value={userInput}
                   onChange={(e) => setUserInput(e.target.value)} placeholder="Zadaj pytanie..."
                   style={{ width: "80%", height: "40px", marginBottom: "10px" }}/>
            <button onClick={sendMessage} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>Wyślij</button>
        </div>
    );
};

export default ChatApp;