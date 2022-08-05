import React, { useState, useEffect, useCallback } from "react";

// redux
import { useDispatch } from "react-redux";
import { loadRoom } from "../redux/modules/room";

// firebase
import "../firebase";
import { getDatabase, onChildAdded, ref } from "firebase/database";

// components
import AddButton from "./AddButton";

// lib
import { List, ListItem, ListItemText, Box } from "@mui/material";

const RoomMenu = () => {
  const dispatch = useDispatch();

  const [rooms, setRooms] = useState([]);
  const [activeRoomId, setActiveRoomId] = useState("");
  // 처음 로드됐는지 아닌지 여부를 state로 가지고 있는다.
  const [firstLoaded, setFirstLoaded] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const unsubscribe = onChildAdded(ref(db, "rooms"), snapshot => {
      setRooms(roomArr => [...roomArr, snapshot.val()]);
    });
    return () => {
      setRooms([]);
      unsubscribe();
    };
  }, []);

  // const changeRoom = room => {
  //   setActiveRoomId(room.id);
  //   dispatch(loadRoom(rooms));
  // };

  const changeRoom = useCallback(
    (room: any) => {
      if (room.id === activeRoomId) return;
      setActiveRoomId(room.id);
      dispatch(loadRoom(room));
    },
    [activeRoomId, dispatch]
  );

  // 처음에 불러온 데이터의 첫번째 목록을 active로 만들어준다.
  useEffect(() => {
    if (rooms.length > 0 && firstLoaded) {
      setActiveRoomId(rooms[0].id);
      // 현재 어디 방인지 채팅방 정보를 넣어준다.
      dispatch(loadRoom(rooms[0]));
      setFirstLoaded(false);
    }
  }, [rooms, firstLoaded]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 24px 20px 24px",
        }}
      >
        <List
          sx={{
            display: "flex",
          }}
        >
          {rooms.map(room => (
            <ListItem
              button
              selected={room.id === activeRoomId}
              onClick={() => {
                changeRoom(room);
              }}
              key={room.id}
              sx={{
                borderRadius: "2rem",
                display: "flex",
                width: "2.5rem",
                height: "2.5rem",
                mr: 1.5,
                color: "var(--bggray)",
                backgroundColor: "var(--darkmain)",
              }}
            >
              <ListItemText
                primary={`${room.name.substring(0, 1)}`}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "var(--white)",
                }}
              />
            </ListItem>
          ))}
        </List>
        <AddButton />
      </Box>
    </>
  );
};

export default RoomMenu;
