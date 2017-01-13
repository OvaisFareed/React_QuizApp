import React, {Component} from 'react';
import Header from './Header';
import Clock from './Clock';
import { hashHistory } from 'react-router';

class QuizInfo extends Component {
    render(){
        return(
            <div>
                <h2>Read these Instructions carefully</h2>
                <br />
                <p>
                    This Quiz consist of <strong>10 Multiple Choice Questions (MCQ's)</strong>, some rules for attempting Quiz are as follows:
                </p>
                <br />
                <p>Attempt all Question, all question carry <strong>equal</strong> marks(10 marks each)
                    <br />Select only <em>One</em> option for each question
                    <br />You have <strong>one minute</strong> to solve each question
                </p>
            </div>
        );
    }
}

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.Quizes = JSON.parse(localStorage.getItem('Quizes'));
        this.quiz = {};
        this.answers = [];
        this.Quizes.forEach((quiz) => {
            if(quiz.name === props.params.quizName){
                this.quiz = quiz;
            }
        });
        this.state = {
            index: 0,
            selected: '',
            buttonText: "Next >",
            min: this.quiz.duration - 1,
            sec: 59,
            showQuestions: false
        };
        this.changeIndex = this.changeIndex.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.finishQuiz = this.finishQuiz.bind(this);
        this.showQuiz = this.showQuiz.bind(this);
        this.preventPageReload = this.preventPageReload.bind(this);
    }

    changeIndex(e){
        if(e.target.dataset.field === 'next') {
            if (this.state.index < this.quiz.questions.length - 1) {
                this.setState({index: this.state.index + 1});
            }
            else {
                this.setState({buttonText: "Finish"});
                this.finishQuiz();
            }
        }
        else {
            if(this.state.index > 0)
            this.setState({index: this.state.index - 1});
        }
    }

    checkValue(e){
        this.setState({selected : e.target.value});
        this.quiz.questions.forEach((ques) => {
            if(e.target.value === ques.answer){
                let found = this.answers.indexOf(ques.answer);
                if(found === -1) {
                    this.answers.push(ques.answer);
                    //console.log('this.answers: ',this.answers);
                }
            }
        })
    }

    showQuiz(){
        this.setState({showQuestions: true, min: this.quiz.duration - 1, sec: 59});
    }

    preventPageReload(){
        window.onbeforeunload = function() {
            return "";
        };
    }

    finishQuiz(){
        let totalMarks = this.quiz.questions.length;
        let marksObt = this.answers.length;
        let per = (marksObt / totalMarks) * 100;
        localStorage.setItem('percentage', per);
        hashHistory.push('result');
    }

    // for Countdown timer

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        console.log('unmount');
        window.onbeforeunload = false;
        clearInterval(this.timerID);
    }

    tick() {
        if(this.state.min === 0 && this.state.sec === 0){
            clearInterval(this.timerID);
            let warning  = document.getElementById('warning');
            warning.innerHTML = 'Times up..';
            warning.style.color = 'red';
        }
        else{
            if(this.state.sec === 1 && this.state.min > 0) {
                this.setState({
                    min: this.state.min - 1,
                    sec: 59
                });
            }
            this.setState({
                sec: this.state.sec - 1
            });
        }
    }

    render(){

        function preventAction(){
              window.onbeforeunload = function(e) {
                return "";
            };
        }
        if(window.location.href === "http://localhost:3000/#/quiz/HTML" || "http://localhost:3000/#/quiz/CSS" || "http://localhost:3000/#/quiz/Javascript")
        {

            preventAction();
            window.onpopstate=function(e)
            {
                if(e.CLICK == 64){
                    window.location.href="http://localhost:3000/#/quiz/HTML";
                    window.location.reload();
                }
            }
        }

        let Comp = <QuizInfo />

        function ShowOptions(props){
            let options = props.options;
            return(
                <table>
                    <tbody className="radio">
                    <tr>
                        <td><label><input name="optionA" type="radio" value={options.a} checked={props.selected === options.a} onChange={props.onClick}/>a. {options.a}</label></td>
                        <td><label><input name="optionB" type="radio" value={options.b} checked={props.selected === options.b} onChange={props.onClick}/>b. {options.b}</label></td>
                    </tr>
                    <tr>
                        <td><label><input name="optionC" type="radio" value={options.c} checked={props.selected === options.c} onChange={props.onClick}/>c. {options.c}</label></td>
                        <td><label><input name="optionD" type="radio" value={options.d} checked={props.selected === options.d} onChange={props.onClick}/>d. {options.d}</label></td>
                    </tr>
                    </tbody>
                </table>
            );
        }
        let user = JSON.parse(localStorage.getItem('user'));

        if(!user){
            Comp = <p>You have to <b>Login</b> first, click Login button to continue..</p>
        }
        else if(!this.state.min && !this.state.sec){
            Comp =
                <div>
                    <p className="timer"><b>Time Remains: </b> {this.state.min}:{this.state.sec}</p>
                    <h2>{this.quiz.title}</h2>
                    <h4 id="warning"></h4>
                    <input className="btn btn-danger" type="button" value="Show Result" onClick={this.finishQuiz} />
                </div>
        }
        else {
            if(!this.state.showQuestions){
               Comp =
                   <div>
                        <QuizInfo />
                        <br />
                        <button className="btn btn-success" type="button" onClick={this.showQuiz}>Start Quiz!</button>
                   </div>
            }
            else {
                Comp =
                    <div>
                        <p className="timer"><b>Time Remains: </b> {this.state.min}:{this.state.sec}</p>

                        <h2>{this.quiz.title}</h2>

                        <div className="question">
                            <h4>{this.quiz.questions[this.state.index].no}</h4>

                            <p>{this.quiz.questions[this.state.index].text}</p>
                            <ShowOptions options={this.quiz.questions[this.state.index].options}
                                         selected={this.state.selected} onClick={this.checkValue}/>
                            <br />
                            <input data-field="back" className="btn btn-default" type="button" value="< Back" onClick={this.changeIndex}/>
                            <input data-field="next" className="left-spaces btn btn-info" type="button" value={this.state.buttonText}
                                   onClick={this.changeIndex}/>
                        </div>
                    </div>
            }
        }

        return(
        <div className="App">
            <Header user={user} />
            <br />
            {Comp}
        </div>
        );
    }
}

export default Quiz;