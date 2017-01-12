import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Test from './Test';
import Quiz from './Quiz';
import Edit from './Edit';
import Result from './Result';
import SignUp from './SignUp';
import './index.css';
import { Router, Route, hashHistory } from 'react-router'

ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={App}/>
      <Route path="/signUp" component={SignUp}/>
      <Route path="/test" component={Test}/>
      <Route path="/quiz/:quizName" component={Quiz}/>
      <Route path="/edit/:username" component={Edit}/>
      <Route path="/result" component={Result}/>
      <Route path="*" component={App}/>
    </Router>,
  document.getElementById('root')
);
