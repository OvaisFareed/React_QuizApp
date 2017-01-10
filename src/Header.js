import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import logo from './logo.svg';
import './App.css';

class Header extends Component {

    backToMain(){
        localStorage.removeItem('user');
        localStorage.removeItem('percentage');
        localStorage.removeItem('location');
        hashHistory.push('/');
    }

    gotoLogin(){
        localStorage.setItem('location', hashHistory.getCurrentLocation().pathname);
        hashHistory.push('/');
    }

    render() {
        const isLoggedIn = (this.props.user) ? true : false;
        let userStatus = null;

        if (isLoggedIn) {
            userStatus = <div className="current-user">Welcome, {this.props.user.username} <button onClick={this.backToMain}>Logout</button></div>
        }
        else {
            userStatus = <div className="current-user"><button className="current-user" onClick={this.gotoLogin}>Login</button></div>
        }

        return (
            <div className="App-header">
                {userStatus}
            </div>
        );
            //<img src={logo} className="App-logo" alt="logo" />
            //<h2> Quiz App </h2>
    }
}

export default Header;