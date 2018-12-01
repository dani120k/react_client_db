import React, { Component } from 'react';
import './App.css';
import { Router, Route, Link, Redirect } from 'react-router-dom';
import Test from './Test'
import RegistrationPage from "./RegistrationPage";
import history from './history'
import LoginBox from "./LoginBox";
import Group from './Group'
import Tasks from './Tasks.js'

class App extends Component {


    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/admin" component={Test}/>
                    <Route exact path="/kek" component={RegistrationPage}/>
                    <PrivateRoute path="/private" component={Test} />
                    <Route exact path="/group" component={Group}/>
                    <PrivateRoute exact path="/tasks" component={Tasks}/>
                </div>
            </Router>
        );
    }
}



function PrivateRoute({ component: Component, ...rest }) {

    return (
        <Route
            {...rest}
            render={props =>
                LoginBox.fakeAuth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/kek",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

export default App;