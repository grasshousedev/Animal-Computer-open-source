import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router } from "react-router-dom";
import { authCheckState } from "./store/actions/auth";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import BackToTop from "./components/BackToTop";
import BaseRouter from "./routes";
import history from "./history";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheckState());
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router history={history}>
          <BaseRouter />
        </Router>
        <BackToTop showBelow={250} />
      </div>
    </ThemeProvider>
  );
};

export default App;
