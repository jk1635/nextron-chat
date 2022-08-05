import React, { useState, useCallback } from "react";

// redux
import { useDispatch } from "react-redux";

// firebase
import "../firebase";
import { child, getDatabase, push, ref, update } from "firebase/database";

// lib
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItem,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddButton = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomDetail, setRoomDetail] = useState("");

  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);

  const handleSubmit = useCallback(async () => {
    // firebase로 realtime database에 등록하기
    const db = getDatabase();
    const key = push(child(ref(db), "rooms")).key;
    const newRoom = {
      id: key,
      name: roomName,
      details: roomDetail,
    };

    const updates = {};

    updates["/rooms/" + key] = newRoom;

    try {
      await update(ref(db), updates);
      setRoomName("");
      setRoomDetail("");
      handleClickClose();
    } catch (error) {
      console.error(error);
    }
  }, [roomName, dispatch, roomDetail]);

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton sx={{ mr: -2, mt: 0.3 }} onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        }
      ></ListItem>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>채팅방 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            생성할 채팅방의 이름과 소개글을 입력해주세요.
          </DialogContentText>
          <TextField
            autoComplete='off'
            autoFocus
            margin='dense'
            label='채팅방 이름'
            type='text'
            fullWidth
            variant='standard'
            onChange={(e: any) => setRoomName(e.target.value)}
          />
          <TextField
            autoComplete='off'
            margin='dense'
            label='소개글'
            type='text'
            fullWidth
            variant='standard'
            onChange={(e: any) => setRoomDetail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>취소</Button>
          <Button onClick={handleSubmit}>생성</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddButton;
