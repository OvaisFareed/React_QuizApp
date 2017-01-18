import React, { Component } from 'react';
import Header from './Header';
import { Link, hashHistory } from 'react-router'

class Test extends Component {
    render()
    {
        let Comp, user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            Comp = <p>You have to <b>Login</b> first, click Login button to continue..</p>
        }
        else{
            Comp = (user.role === 'admin') ? <UserList /> : <QuizList />
        }
        return (
            <div className="App">
                <Header user={user} />
                <br />
                {Comp}
            </div>
        );
    }
}

export default Test;

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.todos = [];
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let warning = document.getElementById('todo');
        if(!this.state.value){
            warning.innerHTML = '* Field must be fill.';
            warning.style.color = 'red';
        }
        else {
            warning.innerHTML = '';
            this.todos.push({text: this.state.value});
            this.setState({value: ''});
        }
    }

    render() {
        let that = this;
        function ListItems(props){
            const todo = props.todo;

            function deleteTodo(){
                console.log('props.itemIndex: ', props.itemIndex);
                that.todos.splice(props.itemIndex, 1);
                that.setState({value: ''});
            }
            return(
                <li>{todo.text} <input type="button" value="x" onClick={deleteTodo} /></li>
            );
        }

        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter text:
                    <input type="text" placeholder="Enter Todo here" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Add" />
            </form>
            <br /><span id="todo"></span>
            <ul>{this.todos.map((t, index)=>{ return <ListItems todo={t} key={index} itemIndex={index}/>  })}</ul>
            </div>
        );
    }
}

class UserList extends Component {
    constructor(props) {
        super(props);
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            loginId: '',
            loginPassword: '',
            username: '',
            password: '',
            email: '',
            contact: '',
            role: ''
        };
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let warning = document.getElementById('todo');
        if(!this.state.value){
            warning.innerHTML = '* Field must be fill.';
            warning.style.color = 'red';
        }
        else {
            warning.innerHTML = '';
            this.todos.push({text: this.state.value});
            this.setState({value: ''});
        }
    }

    render() {
        let that = this;

        function ListItems(props){
            const user = props.user;

            function deleteUser(){
                that.users.splice(props.itemIndex, 1);
                localStorage.setItem('users', JSON.stringify(that.users));
                that.users = JSON.parse(localStorage.getItem('users'));
                hashHistory.replace('test');
            }

            function updateData(){
                hashHistory.push('edit/'+ user.username)
            }

            return(
                <tr>
                    <td>{props.itemIndex}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.contact}</td>
                    <td><input type="button" value="update" onClick={updateData} /></td>
                    <td><input type="button" value="x" onClick={deleteUser} /></td>
                </tr>
            );
        }

        function ListHeader(props){
            if(props.arrayLength === 1){
                return (<tr></tr>);
            }
            else {
                return(
                    <tr>
                        <th>S no.</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                );
            }
        }

        function UsersTable(props){
            return(
                <table className="table">
                    <thead className="App"><ListHeader arrayLength={props.users.length}/></thead>
                    <tbody>
                    {props.users.map((user, index) => {
                        if(user.role !== 'admin') {
                            return <ListItems key={index} user={user} itemIndex={index}/>
                        }
                    })}
                    </tbody>
                </table>
            );
        }


        return (
            <div>
                <h2>User List</h2>
                <UsersTable users={this.users} />
            </div>
        );
    }
}

class QuizList extends Component {
    constructor(props){
        super(props);
        this.Quizes = [
            {
                name: 'HTML',
                title: 'HTML5 - Quiz',
                duration: 10,
                questions: [
                    {
                        no: 'Question 1:',
                        text: 'HTML stands for?',
                        options: {
                            a:'Hyper Text Markup Language', b:'Higher Text Markup Language', c:'Hyper Text Main Language', d:'Hyper Tag Markup Language'
                        },
                        answer: 'Hyper Text Markup Language'
                    },{
                        no: 'Question 2:',
                        text: 'which of the following are block level elements?',
                        options: {
                            a:'div, span, ul', b:'p, li, img', c:'a, i, img', d:'p, h1, div'
                        },
                        answer: 'p, h1, div'
                    },{
                        no: 'Question 3:',
                        text: 'which of the following are inline elements?',
                        options: {
                            a:'a, span, div', b:'span, h2, img', c:'a, i, img', d:'p, div, h1'
                        },
                        answer: 'a, i, img'
                    },{
                        no: 'Question 4:',
                        text: 'what is the Basic structure of HTML?',
                        options: {
                            a:'<html><body></body></html>', b:'<html><head></head><body></body></html>', c:'<head></head><html><body></body></html>',
                            d:'<html><head><body></body></head></html>'
                        },
                        answer: '<html><head></head><body></body></html>'
                    },{
                        no: 'Question 5:',
                        text: 'which tag we write to display text as paragraph?',
                        options: {
                            a:'<para></para>', b:'<p></p>', c:'<text></text>', d:'none of these'
                        },
                        answer: '<p></p>'
                    }, {
                        no: 'Question 6:',
                        text: 'how many types of list in HTML?',
                        options: {
                            a: '2', b: '4', c: '3', d: '1'
                        },
                        answer: '3'
                    },{
                        no: 'Question 7:',
                        text: 'which is the correct syntax for writing image tag?',
                        options: {
                            a:"<img source='pathToimage' />", b:"<img src='pathToimage' />", c:"<image src='pathToimage' />", d:"<img path='pathToimage' />"
                        },
                        answer: "<img src='pathToimage' />"
                    },{
                        no: 'Question 8:',
                        text: 'which tag is used to narrow the text?',
                        options: {
                            a: '<i></i>', b: '<italic></italic>', c: '<narrow></narrow>', d: 'none of these'
                        },
                        answer: '<i></i>'
                                      },{
                        no: 'Question 9:',
                        text: 'which tag is used to bold the text?',
                        options: {
                            a: '<bold></bold>', b: '<dark></dark>', c: '<b></b>', d: 'none of these'
                        },
                        answer: '<b></b>'

                    },{
                        no: 'Question 10:',
                        text: 'what is the available range for heading tag in HTML',
                        options: {
                            a: 'h1 to h4', b: 'h1 to h3', c: 'h1 to h5', d: 'h1 to h6'
                        },
                        answer: 'h1 to h6'
                    }
                ]
            },
            {
                name: 'CSS',
                title: 'CSS3 - Quiz',
                duration: 10,
                questions: [
                    {
                        no: 'Question 1:',
                        text: 'CSS stands for?',
                        options: {
                            a:'Custom Style Sheets', b:'Custom Sheet Styles', c:'Cascading Style Sheets', d:'Cascading Sheets Style'
                        }
                    },{
                        no: 'Question 2:',
                        text: 'Which are two Basic terms used in CSS for append spaces between HTML elements?',
                        options: {
                            a:'width and height', b:'margin and padding', c:'linefeed and tabs', d:'none of these'
                        }
                    },{
                        no: 'Question 3:',
                        text: 'HTML stands for?',
                        options: {
                            a:'', b:'', c:'', d:''
                        }
                    },{
                        no: 'Question 4:',
                        text: 'HTML stands for?',
                        options: {
                            a:'', b:'', c:'', d:''
                        }
                    },{
                        no: 'Question 5:',
                        text: 'HTML stands for?',
                        options: {
                            a:'', b:'', c:'', d:''
                        }
                    }, {
                        no: 'Question 6:',
                        text: 'HTML stands for?',
                        options: {
                            a: '', b: '', c: '', d: ''
                        }
                    },{
                        no: 'Question 7:',
                        text: 'HTML stands for?',
                        options: {
                            a:'', b:'', c:'', d:''
                        }
                    },{
                        no: 'Question 8:',
                        text: 'HTML stands for?',
                        options: {
                            a: '', b: '', c: '', d: ''
                        }
                    },{
                        no: 'Question 9:',
                        text: 'HTML stands for?',
                        options: {
                            a: '', b: '', c: '', d: ''
                        }

                    },{
                        no: 'Question 10:',
                        text: 'HTML stands for?',
                        options: {
                            a: '', b: '', c: '', d: ''
                        }

                    }
                ]
            },
            {
                name: 'Javascript',
                title: 'Javascript - Quiz',
                duration: 10,
                questions: [
                    {
                        no: 'Question 1:',
                        text: 'HTML stands for?',
                        options: {
                            a: '', b: '', c: '', d: ''
                        }
                    }, {
                        no: 'Question 2:',
                        text: 'HTML stands for?',
                        options: {
                            a: '', b: '', c: '', d: ''
                        }
                    }, {
                        no: 'Question 3:',
                        text: 'HTML stands for?',
                        options: {
                            a: '', b: '', c: '', d: ''
                        }
                    }, {
                        no: 'Question 4:',
                        text: 'HTML stands for?',
                        options: {
                            a: '', b: '', c: '', d: ''
                        }
                    }, {
                        no: 'Question 5:',
                        text: 'HTML stands for?',
                        options: {
                            a: '', b: '', c: '', d: ''
                        }
                    }, {
                        no: 'Question 6:',
                        text: 'HTML stands for?',
                        options: {
                            a: '', b: '', c: '', d: ''
                        }
                    }, {
                        no: 'Question 7:',
                        text: 'HTML stands for?',
                        options: {
                            a: '', b: '', c: '', d: ''
                        }
                    }, {
                        no: 'Question 8:',
                        text: 'HTML stands for?',
                        options: {
                            a: '', b: '', c: '', d: ''
                        }
                    }, {
                        no: 'Question 9:',
                        text: 'HTML stands for?',
                        options: {
                            a: '', b: '', c: '', d: ''
                        }

                    }, {
                        no: 'Question 10:',
                        text: 'HTML stands for?',
                        options: {
                            a: '', b: '', c: '', d: ''
                        }

                    }
                ]
            }
        ];

        localStorage.setItem('Quizes', JSON.stringify(this.Quizes));
    }

    render() {
        return (
            <div>
                <h2>Select Quiz:</h2>
                <ul className="quiz-list">
                    <li><Link to={`/quiz/HTML`}>HTML</Link></li>
                    <li><Link to={`/quiz/CSS`}>CSS</Link></li>
                    <li><Link to={`/quiz/Javascript`}>Javascript</Link></li>
                </ul>
            </div>
        );
    }
}