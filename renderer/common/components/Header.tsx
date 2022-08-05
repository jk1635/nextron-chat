import React, { useState } from "react";

// redux
import { useSelector } from "react-redux";

// firebase
import "../firebase";
import { signOut, getAuth } from "firebase/auth";

// lib
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

const Header = () => {
  const { user }: any = useSelector(state => state);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (e: any) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await signOut(getAuth());
  };

  return (
    <>
      <AppBar
        position='static'
        variant='outlined'
        sx={{
          height: "5rem",
          borderRadius: "20px 20px 0 0",
          backgroundColor: "white",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography
              variant='h1'
              component='div'
              color='black'
              sx={{
                fontSize: "1.15rem",
                mt: 0.8,
                fontWeight: 700,
              }}
            >
              안녕하세요. {user.currentUser?.displayName}님!
            </Typography>
          </Box>

          <Box>
            <IconButton onClick={handleOpen}>
              <Avatar alt='profileImage' src={user.currentUser?.photoURL} />
            </IconButton>
            <Menu
              sx={{ ml: "-4px" }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "bottom" }}
            >
              <MenuItem onClick={handleLogout}>
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
