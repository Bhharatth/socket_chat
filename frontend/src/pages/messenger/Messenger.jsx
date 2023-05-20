import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Conversations from "../../components/conversations/Conversations";
import { PF } from "../../utils";
import { AuthContext } from "../../context/AuthContext";
import Messages from "../../components/messages/Messages";
import "./Messenger.css";
const io = require("socket.io-client");

const Messenger = () => {
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const [currentChat, setCurrentchat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivedMessage, setArrivedMessage] = useState(null);
  // console.log(user);
  const [conversation, setConversation] = useState([]);
  // console.log(messages);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("welcome", (data) => {
      // console.log(data)
    });
  }, []);

  useEffect(() => {
    //sending userId to server
    socket.current.emit("add_user", user._id);
    //geting users array from server
    socket.current.on("getUsers", (users) => {});
  }, [user]);

  console.log(socket.current);

  useEffect(() => {
    const getConversations = async () => {
      const res = await axios.get(PF + "/api/conversations/" + user?._id);
      setConversation(res.data);
      // setConversation(" ");
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      const res = await axios.get(PF + "/api/messages/" + currentChat?._id);
      setMessages(res.data);
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivedMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  },[]);
  console.log(arrivedMessage);
  

  useEffect(()=> {
    arrivedMessage && 
  currentChat.members.includes(arrivedMessage.sender) && 
  setMessages((prev)=> [...prev, arrivedMessage]);

  },[arrivedMessage, currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      seder: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const recieverId = currentChat.members.find(
      (member) => 
      member !== user._id
    );

    socket.current.emit("send_message", {
      senderId: user._id,
      recieverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(PF + "/api/messages/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversation.map((c) => (
              <>
                <div onClick={() => setCurrentchat(c)}>
                  <Conversations conversation={c} currentUser={user} />
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <Messages message={m} own={m.sender === user._id} currentUser={user}/>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper"></div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
