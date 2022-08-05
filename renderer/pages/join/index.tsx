// @ts-check

import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";

// redux
import { useDispatch } from "react-redux";
import { setUser } from "../../common/redux/modules/user";

// firebase
import "../../common/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// lib
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import md5 from "md5";

const PasswordValid = (password: any, confirmPassword: any) => {
  if (password.length < 6 || confirmPassword < 6) {
    return false;
  } else if (password !== confirmPassword) {
    return false;
  } else {
    return true;
  }
};

const Join = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    if (!name) {
      setError("이름을 입력해주세요.");
      return;
    }
    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }
    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }
    if (!PasswordValid(password, confirmPassword)) {
      setError("비밀번호를 확인해주세요.");
      return;
    }
    postUserData(name, email, password);
  };

  const postUserData = async (name: any, email: any, password: any) => {
    setLoading(true);
    try {
      // 로그인 한 상태로 바뀐다.
      const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      await updateProfile(user, {
        displayName: name,
        photoURL: `https://www.gravatar.com/avatar/${md5(email)}?d=robohash`,
      });
      await set(ref(getDatabase(), "users/" + user.uid), {
        name: user.displayName,
        avatar: user.photoURL,
      });
      // name과 avatar 프로필 업데이트를 한 후 반영을 하기 위해 setUSer를 작성
      dispatch(setUser(user));
      Router.push("/home");
      // store에 user 저장
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  // 에러 메시지 2초후에 사라지도록 setTimeout 추가
  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: "8rem",
        }}
      >
        <Typography
          component='h1'
          variant='h5'
          sx={{
            letterSpacing: ".05rem",
            fontWeight: "bold",
          }}
        >
          회원가입
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name='name'
                required
                fullWidth
                label='닉네임'
                autoFocus
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='email'
                required
                fullWidth
                label='이메일 주소'
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='password'
                required
                fullWidth
                label='비밀번호'
                type='password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='confirmPassword'
                required
                fullWidth
                label='비밀번호 확인'
                type='password'
              />
            </Grid>
          </Grid>

          {error ? (
            <Alert sx={{ mt: 3 }} severity='error'>
              {error}
            </Alert>
          ) : null}

          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            sx={{
              mt: 3,
              mb: 2,
              color: "var(--white)",
              letterSpacing: ".05rem",
              fontWeight: "bold",
            }}
            loading={loading}
          >
            회원가입
          </LoadingButton>
          <Grid container justifyContent='flex-end'>
            <Grid item sx={{ fontSize: "0.8rem" }}>
              <Link href='/login'>이미 계정이 있나요? 로그인으로 이동</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Join;
