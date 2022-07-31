import React, { useCallback, useState } from "react";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "../firebase";
import {
  getDatabase,
  push,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";

const ChatInput = () => {
  const { room } = useSelector(state => state);
  const { user } = useSelector(state => state);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = e => {
    setMessage(e.target.value);
  };

  const createMessage = () => ({
    timestamp: serverTimestamp(),
    user: {
      id: user.currentUser.uid,
      name: user.currentUser.displayName,
      avatar: user.currentUser.photoURL,
    },
    content: message,
  });

  const clickSendMessage = useCallback(async () => {
    // 메시지가 없을 경우
    if (!message) return;
    setLoading(true);
    try {
      await set(
        push(ref(getDatabase(), "messages/" + room.currentRoom.id)),
        createMessage()
      );
      setLoading(false);
      setMessage("");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [message, room.currentRoom?.id, createMessage]);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        p: "20px 24px",
      }}
    >
      <Grid item xs={12} sx={{ position: "relative" }}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <IconButton disable={loading} onClick={clickSendMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete='off'
          label='메세지 입력'
          fullWidth
          value={message}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default ChatInput;
