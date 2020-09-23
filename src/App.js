import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

//Компоненты
import Auth from "./components/Auth";
import Register from "./components/Register";
import Main from "./components/Main";
import Admin from "./components/Admin";

//АПИ
import { API } from "./API";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      block: false,
      timer: 0,
    };
  }


  auth = (email, password) => {
    axios
      .post(`${API}/auth`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ user: res.data });
        }
      })
      .catch((err) => console.log(err));
  };

  addCounter = (button) => {
    this.setState({ block: true, timer: 20 });

    this.clock();

    let updateUser = this.state.user;

    let newCount = updateUser.count[button] + 1;

    updateUser.count[button] = newCount;

    this.setState({ user: updateUser });
  };

  clock = () => {
    this.timerID = setInterval(() => {
      if (this.state.timer > 0) {
        const updateTimer = this.state.timer - 1;

        this.setState({ timer: updateTimer });
      } else {
        this.setState({ timer: 0, block: false });
        axios
          .put(`${API}/users`, {
            data: this.state.user,
          })
          .then((res) => console.log(res.status))
          .catch((err) => console.log(err));

        clearInterval(this.timerID);
      }
    }, 1000);
  };
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {this.state.user ? (
              <Main
                count={this.state.user.count}
                addCounter={this.addCounter}
                block={this.state.block}
                timer={this.state.timer}
                role={this.state.user.role}
              />
            ) : (
              <Auth auth={this.auth} />
            )}
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/admin">
            {this.state.user.role === "admin" ? <Admin /> : undefined}
          </Route>
        </Switch>
      </Router>
    );
  }
}
