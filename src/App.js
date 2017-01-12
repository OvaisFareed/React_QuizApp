import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Header from './Header';
import './App.css';
import { Router, Route, Link, hashHistory } from 'react-router'

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
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            loginId: '',
            loginPassword: ''
        };
    }
    handleLoginClick(e) {
        e.preventDefault();
        let location = localStorage.getItem('location');
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
            localStorage.setItem('user', JSON.stringify(currentUser));
            (hashHistory.getCurrentLocation().pathname === location || !location)
                ? hashHistory.push('test') : hashHistory.push(location);
        }
        else {
            warning.innerHTML = '* You have to SignUp first, click on Sign Up';
            warning.style.color = 'orange';
        }
        that.setState({loginId: ''});
        that.setState({loginPassword: ''});
    }

    handleChange(event) {
        this.setState({
            [event.target.dataset.field]: event.target.value
        });
    }

  render() {

      function LoginButton(props) {
          return (
              <button className="btn btn-info" type="submit">Login</button>
          );
      }

      return (
          <div>
              <h2>Welcome to Quiz App</h2>
              <br />
              <div className="form">
              <table>
                  <tbody>
                  <tr>
                      <td className="form-group">
                          <form onSubmit={this.handleLoginClick}>
                              <fieldset>
                                  <legend>Login</legend>
                                  <label>Username: <input className="form-control" type="text" value={this.state.loginId}
                                                          data-field="loginId"
                                                          required
                                                          onChange={this.handleChange}/></label><br /><br />
                                  <label>Password: <input className="form-control" type="password"
                                                          value={this.state.loginPassword}
                                                          data-field="loginPassword" required
                                                          onChange={this.handleChange}/></label><br /><br />
                                  <LoginButton />
                              </fieldset>
                          </form>
                      </td>
                  </tr>
                  </tbody>
              </table>
              <br /><span><Link to={`/signUp`}>Sign Up</Link></span>
              <br /><span id="warning"></span>
              </div>
          </div>
      );
  }
}