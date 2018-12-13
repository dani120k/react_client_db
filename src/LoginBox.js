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
      var usernameValue = username.value;
      console.log(usernameValue);
      if (usernameValue === 'admin') {
          LoginBox.fakeAuth.authenticate();
          history.push('/tasks');
      }
      else
          LoginBox.fakeAuth.signout();
      console.log(LoginBox.fakeAuth.isAuthenticated);

      //window.localStorage.setItem('rr_login', usernameValue);
      //console.log(window.localStorage.getItem('rr_login'))
      //LoginBox.OnEnter();
    /*if (this.refs.username !== null) {
    	var username = this.refs.username;
			var usernameValue = username.value;
    }
    if (this.refs.password !== null) {
    	var password = this.refs.password;
			var passwordValue = password.value;
    }
    alert(usernameValue);
    var user = {
      id: usernameValue,
      email: passwordValue
    }

    axios.post("http://127.0.0.1:8080/auth", user).then(response => console.log(response));*/
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
