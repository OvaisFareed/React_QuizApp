import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import { hashHistory } from 'react-router'

class Result extends Component {
    constructor(props) {
        super(props);
        this.buttonText = "Retake Test";
        this.percentage = localStorage.getItem('percentage');
        this.grade = 'failed';
        if(this.percentage >= 60){
            this.grade = 'passed';
        }
    }

    backToMain(){
        localStorage.removeItem('user');
        localStorage.removeItem('location');
        hashHistory.push('/');
    }

    retakeTest(){
        localStorage.removeItem('percentage');
        hashHistory.push('test');
    }

    render(){
        let Comp, that = this, user = JSON.parse(localStorage.getItem('user'));

        if(!user){
            Comp = <p>You have to <b>Login</b> first, click Login button to continue..</p>
        }
        else{
            Comp =
                <div>
                    <h2>Result</h2>
                    <br /><br />
                    <Content grade={this.grade} percentage={this.percentage} />
                    <br /><br />
                    <input className="btn btn-info" type="button" value={this.buttonText} onClick={this.retakeTest}/>
                    <input className="btn btn-default backBtn" type="button" value="Back to Main" onClick={this.backToMain}/>
                </div>
        }

        function Content(props) {
            if(!props.percentage) {
                that.buttonText = "Take Test";
                return (
                    <p>No result to show.</p>
                );
            }
            else{
                return (
                    <p className={props.grade}>You are {props.grade}, your percentage is {props.percentage}%.</p>
                );
            }
        }

        return (
            <div className="App">
                <Header user={user} />
                <br />
                {Comp}
                <Footer />
            </div>
        );
    }
}

export default Result;