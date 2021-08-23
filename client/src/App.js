import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {  Router, Switch, Route, Link, NavLink } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import User from "./components/User";
import Admin from "./components/Admin";
import MainPage from "./components/MainPage";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';
import { BrowserRouter, HashRouter } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminPage: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminPage: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showAdminPage } = this.state;


    

    return (
      <Router history={history}>
         <BrowserRouter>
        <div>
       
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">

              {!currentUser? (
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  STRONA STARTOWA
                </Link>
              </li>
              ):null
              }

              {showAdminPage && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    STRONA ADMINA
                  </Link>
                </li>
              )}

              {currentUser && (
               
                <li className="nav-item">
                  <NavLink to={`/mainPage/${currentUser.team==="zespol1"?'zespol1':'choose'}`}  className="nav-link">
                    STRONA ZESPOŁU
                  </NavLink>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.name.toUpperCase()} {currentUser.surname.toUpperCase()}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    WYLOGUJ
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    ZALOGUJ
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    ZAREJESTRUJ
                  </Link>
                </li>
              </div>
            )}
          </nav>

          
            <Switch>
              <Route exact path={"/home"} component={Home} />
              <Route exact path={"/"} component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route path="/mainPage" component={MainPage} />
              <Route path="/profile" component={Profile} />
              <Route path="/user" component={User} />
              <Route path="/admin" component={Admin} />
            </Switch>
          
        </div>
        </BrowserRouter>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);