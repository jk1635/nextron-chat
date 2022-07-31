import { Divider, Grid, List, Paper, Toolbar } from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";
import ChatHeader from "./ChatHeader";
import { useDispatch, useSelector } from "react-redux";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import "../firebase";
import {
  child,
  get,
  getDatabase,
  onChildAdded,
  orderByChild,
  query,
  ref,
  startAt,
} from "firebase/database";
import { loadRoom } from "../redux/modules/room";

const Chat = () => {
  const dispatch = useDispatch();

  const { room } = useSelector(state => state);
  const { user } = useSelector(state => state);
  const [messages, setMessages] = useState([]);
  // const messageEndRef = useRef();

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
      <Grid sx={{}}>
        <Grid
          container
          // component={Paper}
          variant='outlined'
          sx={{
            display: "flex",
            alignItems: "space-between",
            // justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
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
              <ChatMessage
                key={message.timestamp}
                message={message}
                user={user}
              />
            ))}
            {/* <div ref={messageEndRef}></div> */}
          </List>
          <Divider />
          <ChatInput />
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
