import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Header from './Header';
import './App.css';
import { Router, Route, hashHistory } from 'react-router'

class SignUp extends Component {
    constructor(props){
        super(props);
        //console.log('parent props: ', props);
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: '',
            password: '',
            email: '',
            contact: '',
            role: ''
        };
    }

    handleChange(event){
        this.setState({
            [event.target.dataset.field]: event.target.value
        });

    }

    handleSubmit(event) {
        event.preventDefault();
        let that = this, credentials = {username: false, email: false};
        let content = document.getElementById('warning');
        content.style.color = 'red';
        if(that.users.length) {
            that.users.forEach(function (user) {
                if (user.username === that.state.username) {
                    credentials.username = true;
                }
                if (user.email === that.state.email) {
                    credentials.email = true;
                }
            });
        }
        if (credentials.username) {
            content.innerHTML = '* Username is already exist';
            this.setState({username: ''})
        }
        if (credentials.email) {
            content.innerHTML = (content.innerHTML) ? content.innerHTML + '<br />' +'* Email is already exist' : '* Email is already exist';
            this.setState({email: ''})
        }
        else {
            this.users.push({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                contact: this.state.contact,
                role: 'user'
            });
            localStorage.setItem('users', JSON.stringify(this.users));
            localStorage.setItem('user', JSON.stringify(this.state));
            hashHistory.push('test');
        }
    }
    render() {

        function SignupButton(props) {
            return (
                <button className="btn btn-info" type="submit">SIGN UP</button>
            );
        }

        return (
            <div className="App">
                <Header />
                <br />
                <div>
                    <h2>Welcome to Quiz App</h2><br />
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>SignUp</legend>
                            <label>Username: <input className="form-control" className="form-control" type="text" value={this.state.username}
                                                    data-field="username"
                                                    required
                                                    onChange={this.handleChange}/></label><br /><br />
                            <label>Password: <input className="form-control" type="password" value={this.state.password}
                                                    data-field="password"
                                                    required
                                                    onChange={this.handleChange}/></label><br /><br />
                            <label>Email: <input className="form-control" type="email" value={this.state.email}
                                                 data-field="email" required
                                                 onChange={this.handleChange}/></label><br /><br />
                            <label>Contact: <input className="form-control" type="text" value={this.state.contact}
                                                   data-field="contact"
                                                   required
                                                   onChange={this.handleChange}/></label><br /><br />
                            <SignupButton />
                        </fieldset>
                    </form>
                    <br /><span id="warning"></span>
                </div>
            </div>
        );
    }
}

export default SignUp;