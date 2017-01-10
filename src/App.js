import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Header from './Header';
import './App.css';
import { Router, Route, hashHistory } from 'react-router'

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header />
                <br />
                <Main />
            </div>
        );
    }
}

export default App;

class Main extends Component {
    constructor(props){
        super(props);
        //console.log('parent props: ', props);
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            loginId: '',
            loginPassword: '',
            username: '',
            password: '',
            email: '',
            contact: '',
            role: '',
            isLoggedIn: false
        };
    }
    handleLoginClick(e, goto) {
        e.preventDefault();
        let location = localStorage.getItem('location');
        if(goto === 'todo'){
            location = location || 'test';
            hashHistory.push(location);
        }
        else {
            let that = this, currentUser = {}, userExist = false;
            let warning = document.getElementById('warning');
            that.users.forEach(function (user) {
                if (user.username === that.state.loginId && user.password === that.state.loginPassword) {
                    userExist = true;
                    currentUser = user;
                }
            });
            if (userExist) {
                warning.innerHTML = '';
                that.setState({loginId: ''});
                that.setState({loginPassword: ''});
                localStorage.setItem('user', JSON.stringify(currentUser));
                (hashHistory.getCurrentLocation().pathname === location || !location)
                    ? hashHistory.push('test') : hashHistory.push(location);
            }
            else {
                warning.innerHTML = '* You have to SignUp first.';
                warning.style.color = 'orange';
            }
        }
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }
    handleChange(event){
        this.setState({
            [event.target.dataset.field]: event.target.value
        });

    }
    handleLoginPassword(event){
        this.setState({loginPassword: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.users.push({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            contact: this.state.contact,
            role: 'user'
        });
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('user', JSON.stringify(this.state));
        console.log('this.users: ', this.users);
        this.setState({username: ''});
        this.setState({password: ''});
        this.setState({email: ''});
        this.setState({contact: ''});
        this.handleLoginClick(event, 'todo');
    }

  render() {

      function LoginButton(props) {
          return (
              <button type="submit">Login</button>
          );
      }

      function SignupButton(props) {
          return (
              <button type="submit">Sign up</button>
          );
      }

      return (
          <div>
              <h2>Welcome to Quiz App</h2>
              <table className="form">
                  <tbody>
                  <tr>
                      <td>
                          <form onSubmit={this.handleLoginClick}>
                              <fieldset className="Login">
                                  <legend>Login</legend>
                                  <label>Username: <input type="text" value={this.state.loginId} data-field="loginId" required
                                                          onChange={this.handleChange}/></label><br /><br />
                                  <label>Password: <input type="password" value={this.state.loginPassword} data-field="loginPassword" required
                                                          onChange={this.handleChange}/></label><br /><br />
                                  <LoginButton />
                              </fieldset>
                          </form>
                      </td>
                      <td>
                          <form onSubmit={this.handleSubmit}>
                              <fieldset className="Signup">
                                  <legend>SignUp</legend>
                                  <label>Username: <input type="text" value={this.state.username} data-field="username" required
                                                          onChange={this.handleChange}/></label><br /><br />
                                  <label>Password: <input type="password" value={this.state.password} data-field="password" required
                                                          onChange={this.handleChange}/></label><br /><br />
                                  <label>Email: <input type="email" value={this.state.email} data-field="email" required
                                                       onChange={this.handleChange}/></label><br /><br />
                                  <label>Contact: <input type="text" value={this.state.contact} data-field="contact" required
                                                         onChange={this.handleChange}/></label><br /><br />
                                  <SignupButton />
                              </fieldset>
                          </form>
                      </td>
                  </tr>
                  </tbody>
              </table>
              <br /><span id="warning"></span>
          </div>
      );
  }
}