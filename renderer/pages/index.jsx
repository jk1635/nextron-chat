import Head from "next/head";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./../common/redux/modules/user";
import "./../common/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CircularProgress, Stack } from "@mui/material";

const Index = () => {
  const dispatch = useDispatch();
  const { isLoading, currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (!!user) {
        // 유저 로그인
        dispatch(setUser(user));
      } else {
        // 유저 정보가 없으면 로그아웃
        dispatch(clearUser());
      }
    });
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
      <ul>
        <li>
          {currentUser ? (
            <Link href='/home'>
              <a>Home</a>
            </Link>
          ) : (
            <Link href='/login'>
              <a>Join</a>
            </Link>
          )}
        </li>
        <li>
          {currentUser ? (
            <Link href='/home'>
              <a>Home</a>
            </Link>
          ) : (
            <Link href='/login'>
              <a>Login</a>
            </Link>
          )}
        </li>
        <li>
          {currentUser ? (
            <Link href='/home'>
              <a>Home</a>
            </Link>
          ) : (
            <Link href='/join'>
              <a>Join</a>
            </Link>
          )}
        </li>
      </ul>
    </>
  );
};

export default Index;
