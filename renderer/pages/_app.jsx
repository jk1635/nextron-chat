import React from "react";
import { Provider } from "react-redux";
import store from "../common/redux/configureStore";
import Template from "../common/components/Template";
import GlobalStyle from "../common/styles/GlobalStyle";

export default function (props) {
  const { Component, pageProps } = props;

  return (
    <Provider store={store}>
      <GlobalStyle />
      <Template>
        <Component {...pageProps} />
      </Template>
    </Provider>
  );
}
