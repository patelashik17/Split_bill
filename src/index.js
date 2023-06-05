import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>
);

reportWebVitals();
