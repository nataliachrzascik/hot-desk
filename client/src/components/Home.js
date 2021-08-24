import React, { Component } from "react";

import UserService from "../services/userService";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };

    
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Zaloguj się, aby korzystać z hot desków!</h3>
        </header>
      </div>
    );
  }
}