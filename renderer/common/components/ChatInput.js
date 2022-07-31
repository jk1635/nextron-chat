import React, {
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import "../firebase";
import {
  getDatabase,
  push,
  ref,
  serverTimestamp,
  set,
  child,
  get,
  update,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { roomReducer, loadRoom } from "../redux/modules/room";

const ChatInput = () => {
  const dispatch = useDispatch();
  const { room } = useSelector(state => state);
  const { user } = useSelector(state => state);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const messagesContent = useSelector(state => state);
  const handleChange = e => {
    setMessage(e.target.value);
  };

  // const createMessage = () => ({
  //   timestamp: serverTimestamp(),
  //   user: {
  //     id: user.currentUser.uid,
  //     name: user.currentUser.displayName,
  //     avatar: user.currentUser.photoURL,
  //   },
  //   content: message,
  // });

  const createMessage = useCallback(
    () => ({
      timestamp: serverTimestamp(),
      user: {
        id: user.currentUser.uid,
        name: user.currentUser.displayName,
        avatar: user.currentUser.photoURL,
      },
      content: message,
    }),
    [
      message,
      user.currentUser.uid,
      user.currentUser.displayName,
      user.currentUser.photoURL,
    ]
  );

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

        padding: "20px",
      }}
    >
      <Grid item xs={12} sx={{ position: "relative" }}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <IconButton disable={loading} onClick={clickSendMessage}>
                  {/* 메시지 입력하는 동안은 또 보내지 않도록 설정 */}
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
