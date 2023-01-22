import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Home from "./Home";
import { useEffect } from "react";
import { getUserAuth } from "../action";
import { connect } from "react-redux";
import Post from "./main-sections/Post";
import { Toaster } from "react-hot-toast";
import { PostContextProvider } from "../context/postContext";
import { ThemeContextProvider } from "../context/themeContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ADE792",
    },
    primary: {
      main: "#0081C9",
    },
  },
});

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <PostContextProvider>
          <ThemeContextProvider>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Login />
                </Route>
                <Route path="/feed">
                  <Box minHeight="100vh" display="flex" flexDirection="column">
                    <Header />
                    <Home />
                  </Box>
                </Route>
                <Route path="/post/:id">
                  <Box minHeight="100vh" display="flex" flexDirection="column">
                    <Header />
                    <Post />
                  </Box>
                </Route>
              </Switch>
            </Router>
          </ThemeContextProvider>
        </PostContextProvider>
      </ThemeProvider>
      <Toaster />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
