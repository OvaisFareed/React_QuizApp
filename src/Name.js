import React, { Component } from 'react';
import imageUrl from './logo.svg';
import Clock from './Clock';
import Toggle from './Toggle';
import Test from './Test';
import LoginControl from './Test';

class Name extends Component {
    render() {
        function formatName(user) {
            return user.firstName + ' ' + user.lastName;
        }
        function getGreeting(user) {
            if (user) {
                return <h1>Hello, {formatName(user)}!</h1>;
            }
            return <h1>Hello, Stranger.</h1>;
        }
        const user = {
            firstName: 'Ovais',
            lastName: 'Siddiqui'
        };
        function Avatar(props) {
            return (
                <img className="Avatar" width="100" height="100"
                     src={props.user.avatarUrl}
                     alt={props.user.name}
                    />
            );
        }
        function Comment(props){
            return (
                <div className="Comment">
                    <div className="UserInfo">
                        <Avatar user={props.author} />
                        <div className="UserInfo-name">
                            {props.author.name}
                        </div>
                    </div>
                    <div className="Comment-text">
                        {props.text}
                    </div>
                    <div className="Comment-date">
                        {props.date}
                    </div>
                </div>
            );
        }
        function ActionLink() {
            function handleClick(e) {
                //e.preventDefault();
                console.log('The link was clicked.');
            }

            return (
                <a href="#" onClick={handleClick}>
                    Click me
                </a>
            );
        }
        const comment = {
          author: {
              name: 'Ovais',
              avatarUrl: imageUrl
          },
            text: 'weldone keep it up',
            date: new Date().toLocaleTimeString()
        };
        return (
            <div>
                <br />
                <LoginControl />
            </div>
            //<Test />
            //<Toggle />
            //<Clock />
            //<ActionLink />
            //<Comment author={comment.author} text={comment.text} date={comment.date}  />
        );
    }
}

export default Name;
