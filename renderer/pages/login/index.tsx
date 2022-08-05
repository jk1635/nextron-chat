// @ts-check

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

// firebase
import "../../common/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// lib
import {
  Avatar,
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!email || !password) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    loginUser(email, password);
  };

  const loginUser = async (email: any, password: any) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
    Router.push("/home");
  };

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
          로그인
        </Typography>

        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            label='이메일 주소'
            name='email'
            autoComplete='off'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='비밀번호'
            name='password'
            type='password'
          />

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
            로그인
          </LoadingButton>
          <Grid container justifyContent='flex-end'>
            <Grid item sx={{ fontSize: "0.8rem" }}>
              <Link href='/join'>계정이 없나요? 회원가입으로 이동</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
