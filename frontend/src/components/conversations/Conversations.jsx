import React, { useEffect, useState } from "react";
import "./Conversations.css";
import axios from "axios";
import { PF } from "../../apiCalls";

const Conversations = ({ conversation, currentUser }) => {
  const [User, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(PF + "/api/users?userId=" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    console.log({User});
  },[]);
  //currentUser,conversation

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLlSxCIknrWd1a6-Df0EcAVLMliIrXATBw62iImlaU&s"
        alt=""
      />
      <span className="conversationName">{User?.username}</span>
    </div>
  );
};

export default Conversations;
