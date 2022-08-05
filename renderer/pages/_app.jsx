import React from "react";

// redux
import { Provider } from "react-redux";
import store from "../common/redux/configureStore";

// components
import GlobalStyle from "../common/styles/GlobalStyle";
import Template from "../common/components/Template";

// lib
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function (props) {
  const { Component, pageProps } = props;
  const theme = createTheme({
    palette: {
      primary: { main: "#BBC4EF" },
      secondary: { main: "#E7E5E4" },
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
