import React, { useState } from "react";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";

import { useSelector } from "react-redux";
import "../firebase";
import { signOut, getAuth } from "firebase/auth";
import MenuIcon from "@mui/icons-material/Menu";
import RoomMenu from "./RoomMenu";
import AddButton from "./AddButton";
const Header = () => {
  const { user } = useSelector(state => state);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await signOut(getAuth());
    console.log("axdf");
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
            <AddButton />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
