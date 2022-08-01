import React, { useEffect } from "react";
import Router from "next/router";

// redux
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../../common/redux/modules/user";

// firebase
import "../../common/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// components
import Header from "../../common/components/Header";
import RoomMenu from "../../common/components/RoomMenu";
import Chat from "../../common/components/Chat";

// lib
import { CircularProgress, Stack } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user !== null) {
        // 유저 로그인
        dispatch(setUser(user));
      } else {
        // 유저 정보가 없으면 로그아웃
        dispatch(clearUser());
        Router.push("/login");
      }
    });
    // onAuthStateChanged가 계속 쌓이지 않도록 unsubscribe를 해준다.
    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) {
    return (
      <Stack alignItems='center' justifyContent='center' height='100vh'>
        <CircularProgress color='primary' size={70} />
      </Stack>
    );
  }
  return (
    <>
      <Header />
      <RoomMenu />
      <Chat />
    </>
  );
};

export default Home;
