import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Alert,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import "../../common/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Router from "next/router";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = e => {
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

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (e) {
      setError(e.message);
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
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}>
          <TagIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
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
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
          >
            로그인
          </LoadingButton>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link
                href='/join'
                style={{ textDecoration: "none", color: "blue" }}
              >
                계정이 없나요? 회원가입으로 이동
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

// import React, { useState, useEffect } from "react";

// import {
//   Avatar,
//   Box,
//   Container,
//   Typography,
//   Grid,
//   TextField,
//   Alert,
// } from "@mui/material";
// import TagIcon from "@mui/icons-material/Tag";
// import { LoadingButton } from "@mui/lab";
// // import Link from '../components/Link';
// import Link from "next/link";

// import "../common/firebase";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// const login = () => {
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const handleSubmit = e => {
//     e.preventDefault();
//     const data = new FormData(e.currentTarget);
//     const email = data.get("email");
//     const password = data.get("password");
//     if (!email || !password) {
//       setError("모든 항목을 입력해주세요.");
//       return;
//     }
//     loginUser(email, password);
//   };

//   const loginUser = async (email, password) => {
//     setLoading(true);
//     try {
//       await signInWithEmailAndPassword(getAuth(), email, password);
//     } catch (e) {
//       setError(e.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!error) return;
//     setTimeout(() => {
//       setError("");
//     }, 2000);
//   }, [error]);

//   return (
//     <Container component='main' maxWidth='xs'>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100vh",
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}>
//           <TagIcon />
//         </Avatar>
//         <Typography component='h1' variant='h5'>
//           로그인
//         </Typography>

//         <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             margin='normal'
//             required
//             fullWidth
//             label='이메일 주소'
//             name='email'
//             autoComplete='off'
//             autoFocus
//           />
//           <TextField
//             margin='normal'
//             required
//             fullWidth
//             label='비밀번호'
//             name='password'
//             type='password'
//           />

//           {error ? (
//             <Alert sx={{ mt: 3 }} severity='error'>
//               {error}
//             </Alert>
//           ) : null}

//           <LoadingButton
//             type='submit'
//             fullWidth
//             variant='contained'
//             color='primary'
//             sx={{ mt: 3, mb: 2 }}
//             loading={loading}
//           >
//             로그인
//           </LoadingButton>
//           <Grid container justifyContent='flex-end'>
//             <Grid item>
//               <Link
//                 to='/join'
//                 style={{ textDecoration: "none", color: "blue" }}
//               >
//                 계정이 없나요? 회원가입으로 이동
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default login;
