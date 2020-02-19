import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

// import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Management from "./views/Management";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();
  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <div>
          <Switch>
            {/* <Route exact path="/">
              {!isAuthenticated ? window.location.assign("https://dev-7cmjhpaa.auth0.com/login?state=g6Fo2SBQQUdNcjlGMFYyWHR2RUlseHpYbWNRVHNKRUhEV2xyVaN0aWTZIHN3WmlENmZ5STNyQUZaLVBmbWZuOUdldllaMzlMM3ppo2NpZNkgTTVpNm91eXJoQko4MjU0anQyRlNyUFZMQjhOZWYzek0&client=M5i6ouyrhBJ8254jt2FSrPVLB8Nef3zM&protocol=oauth2&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=openid%20profile%20email&response_type=code&response_mode=query&nonce=YgqJn_zTbogf_xpUKpnMNOOD3CHG3ymaejSNzVXg9H.&code_challenge=GyCbvUnWM57I247Vd0A3KMdJehDLf7T4dePYQSSKCp8&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtc3BhLWpzIiwidmVyc2lvbiI6IjEuNi4zIn0%3D")  : <Management />}
            </Route> */}
            <Route path="/" exact component={isAuthenticated? Management : Home} />/
            {/* <PrivateRoute path="/profile" component={Management} /> */}
          </Switch>
        </div>
        {isAuthenticated? '' : <Footer />}
      </div>
    </Router>
  );
};

export default App;
