import React, { Component } from 'react';
import "./LoginBox.scss"
import axios from 'axios'
import history from './history'
import App from './App'

class LoginBox extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }

    static fakeAuth = {
        isAuthenticated: false,
        authenticate() {
            this.isAuthenticated = true;
            ////setTimeout(cb, 100); // fake async
        },
        signout() {
            this.isAuthenticated = false;
            //setTimeout(cb, 100);
        }
    };

  submitLogin(event) {

      var username = this.refs.username;

      var password = this.refs.password;

      var user = new Object();
      user.login = username.value;
      user.password = password.value;

      var answer;
      axios.post("http://127.0.0.1:8080/registration/auth", user).then(response => {
          console.log(response);
          if (response.data.errorCode === 0) {
              LoginBox.fakeAuth.authenticate();
              history.push('/tasks');
          } else {
              console.log(response.status);
              LoginBox.fakeAuth.signout();
          }
      });

  }


  render() {
    return (
    <div className="inner-container">
        <div className="header">
          Login
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              ref="username"
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onKeyPress={this.submitLogin.bind(this)}
              //onKeyPress={this.keyPress}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              ref="password"
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"/>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitLogin
            .bind(this)}>Login</button>
        </div>
      </div>
    );
  }
}

export default LoginBox;
