import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Management from "./views/Management";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import ReactNotification from 'react-notifications-component';

// styles
import "./App.css";
import 'react-notifications-component/dist/theme.css';

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
        {isAuthenticated? <NavBar />: ''}
        <div>
          <ReactNotification />
          <Switch>
            <Route 
              render={props=> {
                if(!isAuthenticated) loginWithRedirect();
                else return <Management />
              }}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
