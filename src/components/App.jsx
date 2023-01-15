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

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/feed">
              <Header />
              <Home />
            </Route>
            <Route path="/post/:id">
              <Header />
              <Post />
            </Route>
          </Switch>
        </Router>
      </PostContextProvider>
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
