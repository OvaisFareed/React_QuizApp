import React, { Component } from 'react';
import Header from './Header';
import { hashHistory } from 'react-router'

class Edit extends Component {

    render() {
        let that = this, index = 0, user = {}, users = JSON.parse(localStorage.getItem('users'));
        users.forEach((userObj, idx) =>{
            if(that.props.params.username === userObj.username) {
                user = userObj;
                index = idx;
            }
        });
        return (
            <div className="App">
                <Header user={user} />
                <br />
                <EditForm user={user} index={index} users={users}/>
            </div>
        );

    }
}

export default Edit;

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
        this.state = props.user;
        this.users = props.users;
        this.index = props.index;
    }

    handleChange(event){
        this.setState({
            [event.target.dataset.field]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let warning = document.getElementById('warning');
        if(!this.state.username || !this.state.password || !this.state.email || !this.state.contact) {
            warning.innerHTML = '* Field must be fill.';
            warning.style.color = 'red';
        }
        else {
            warning.innerHTML = '';
            this.users.splice(this.index,1,{
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                contact: this.state.contact,
                role: 'user'
            });
            localStorage.setItem('users', JSON.stringify(this.users));
            console.log('this.users: ', this.users);
            this.setState({username: ''});
            this.setState({password: ''});
            this.setState({email: ''});
            this.setState({contact: ''});
            hashHistory.push('test');
        }
    }

    cancelUpdate(){
        hashHistory.push('test');
    }

    render() {
        return (
            <div>
                <h2>Update your Info</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Username: <input type="text" value={this.state.username} data-field="username"
                                            onChange={this.handleChange}/></label><br /><br />
                    <label>Password: <input type="text" value={this.state.password} data-field="password"
                                            onChange={this.handleChange}/></label><br /><br />
                    <label>Email: <input type="email" value={this.state.email} data-field="email"
                                         onChange={this.handleChange}/></label><br /><br />
                    <label>Contact: <input type="text" value={this.state.contact} data-field="contact"
                                           onChange={this.handleChange}/></label><br /><br />
                    <input type="submit" value="Update"/>
                    <input type="button" value="Cancel" onClick={this.cancelUpdate}/>
                </form>
                <br /><span id="warning"></span>
            </div>
        )
    }
}