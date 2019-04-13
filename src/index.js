import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import { App } from "./containers/App";
import { store } from "./store";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider {...{ store }}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
