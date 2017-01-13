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
        hashHistory.push('test');
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
                    <h2>Welcome to Quiz App</h2>
                    <br />
                    <table className="form">
                        <tbody>
                        <tr>
                            <td className="form-group">
                                <form onSubmit={this.handleSubmit}>
                                    <fieldset className="Signup">
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
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default SignUp;