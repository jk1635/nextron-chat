import React, { useState, useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { Divider, Grid, List } from "@mui/material";

// firebase
import "../firebase";
import { child, get, getDatabase, ref } from "firebase/database";

// components
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const Chat = () => {
  const dispatch = useDispatch();

  const { room }: any = useSelector<any>(state => state);
  const { user }: any = useSelector<any>(state => state);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!room.currentRoom) return;

    async function getMessages() {
      const snapShot = await get(
        child(ref(getDatabase()), "messages/" + room.currentRoom.id)
        // Object.values를 이용해서 value값을 가져온다. 없으면 빈 배열 리턴
      );
      setMessages(snapShot.val() ? Object.values(snapShot.val()) : []);
    }
    getMessages();
    return () => {
      setMessages([]);
    };
  }, [room.currentRoom]);

  return (
    <>
      <ChatHeader roomInfo={room.currentRoom} />
      <Grid container>
        <List
          sx={{
            height: "calc(100vh - 425px)",
            overflow: "hidden",
            overflowY: "scroll",
            maxHeight: "100vh",
            width: "100%",
          }}
        >
          {messages.map(message => (
            <ChatMessage key={message} message={message} user={user} />
          ))}
        </List>
        <Divider />
        <ChatInput />
      </Grid>
    </>
  );
};

export default Chat;
