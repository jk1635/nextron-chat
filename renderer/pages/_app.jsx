import React from "react";
import { Provider } from "react-redux";
import store from "../common/redux/configureStore";
import Template from "../common/components/Template";
import GlobalStyle from "../common/styles/GlobalStyle";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function (props) {
  const { Component, pageProps } = props;
  const theme = createTheme({
    palette: {
      primary: { main: "#BBC4EF" },
      // {
      //   main: "#000000",
      //   dark: "#BBC4EF",
      //   white: "#FFFFFF",
      // },
      secondary: { main: "#E7E5E4" },
      // {
      //   light: "#FAFAF9",
      //   main: "#E7E5E4",
      //   black: "#000000",
      // },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <Template>
          <Component {...pageProps} />
        </Template>
      </Provider>
    </ThemeProvider>
  );
}
