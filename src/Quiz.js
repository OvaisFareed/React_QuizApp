import React, {Component} from 'react';
import Header from './Header';
import Clock from './Clock';
import { hashHistory } from 'react-router';

class QuizInfo extends Component {
    render(){
        return(
            <div className="col-md-12">
                <h2>Read these Instructions carefully</h2>
                <br />
                <div className="row">
                    <p>
                        This Quiz consist of <strong>10 Multiple Choice Questions (MCQ's)</strong>, some rules for attempting Quiz are as follows:
                    </p>
                </div>
                <br />
                <div className="row">
                    <p>Attempt all Question, all question carry <strong>equal</strong> marks(10 marks each)
                        <br />Select only <em>One</em> option for each question
                        <br />You have <strong>one minute</strong> to solve each question
                    </p>
                </div>
            </div>
        );
    }
}

class Timer extends Component {
    constructor(props, contex){
        super(props, contex);
        //console.log('props: ', props);
        this.state = {
            minutes: props.minutes,
            //minutes: 0,
            seconds: 59
            //seconds: 12
        };
    }

    // for Countdown timer

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        if(this.state.minutes === 0 && this.state.seconds === 0){
            clearInterval(this.timerID);
        }
        else{
            if(this.state.seconds === 1 && this.state.minutes > 0) {
                this.setState({
                    minutes: this.state.minutes - 1,
                    seconds: 59
                });
            }
            this.setState({
                seconds: this.state.seconds - 1
            });
        }
    }

    render() {
        const time = this.state;
        if(!time.minutes && !time.seconds){
            time.finish = true;
            return this.props.children(time);
        }
        else{
            return this.props.children(time);
        }
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
            minutes: this.quiz.duration - 1,
            //minutes: 0,
            showQuestions: false,
            timeEnds: false
        };
        this.changeIndex = this.changeIndex.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.finishQuiz = this.finishQuiz.bind(this);
        this.showQuiz = this.showQuiz.bind(this);
        this.timesUp = this.timesUp.bind(this);
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
        this.setState({showQuestions: true});
    }

    timesUp(){
        this.setState({timeEnds: true});
    }

    finishQuiz(){
        let totalMarks = this.quiz.questions.length;
        let marksObt = this.answers.length;
        let per = (marksObt / totalMarks) * 100;
        localStorage.setItem('percentage', per);
        hashHistory.push('result');
    }

    render(){

        function preventAction(){
            window.onbeforeunload = function(e) {
                return "";
            };
        }
        if(window.location.href === "http://localhost:3000/#/quiz/HTML" || "http://localhost:3000/#/quiz/CSS" || "http://localhost:3000/#/quiz/Javascript") {
            preventAction();
            //window.onpopstate=function(e)
            //{
            //    if(e.CLICK == 64){
            //        window.location.href="http://localhost:3000/#/quiz/HTML";
            //        window.location.reload();
            //    }
            //}
        }

        let Comp = <QuizInfo /> || <Timer />


        function ShowOptions(props){
            let options = props.options;
            return(
                <div className="radio">
                    <div className="row">
                        <div className="col-md-4"><label><input name="optionA" type="radio" value={options.a} checked={props.selected === options.a} onChange={props.onClick}/>a. {options.a}</label></div>
                        <div className="col-md-4"><label><input name="optionB" type="radio" value={options.b} checked={props.selected === options.b} onChange={props.onClick}/>b. {options.b}</label></div>
                    </div>
                    <div className="row">
                        <div className="col-md-4"><label><input name="optionC" type="radio" value={options.c} checked={props.selected === options.c} onChange={props.onClick}/>c. {options.c}</label></div>
                        <div className="col-md-4"><label><input name="optionD" type="radio" value={options.d} checked={props.selected === options.d} onChange={props.onClick}/>d. {options.d}</label></div>
                    </div>
                </div>
            );
        }

        let user = JSON.parse(localStorage.getItem('user'));

        if(!user){
            Comp = <p>You have to <b>Login</b> first, click Login button to continue..</p>
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
            else if(this.state.timeEnds) {
                Comp =
                    <div>
                        <h2>{this.quiz.title}</h2>
                        <Timer minutes={this.state.minutes}>{(time) => {
                            return <p className="timer"><b>Time Remains: </b> 0{time.minutes}:0{time.seconds}</p>
                        }}
                        </Timer>
                        <br /><br />
                        <h3 className="failed">Times Up..</h3>
                        <br /><br />
                        <input className="btn btn-danger" type="button" value="Show Result" onClick={this.finishQuiz}/>
                    </div>
            }

            else {
                Comp =
                    <div className="col-md-12">
                        <h2>{this.quiz.title}</h2>

                        <Timer minutes={this.state.minutes}>{(time) => {
                            if (time.finish) {
                                this.timesUp();
                                return <div></div>;
                            }
                            if(time.minutes < 10 && time.seconds >= 10){
                                return <p className="timer"><b>Time Remains: </b> 0{time.minutes}:{time.seconds}</p>
                            }

                            if(time.minutes >= 10 && time.seconds < 10){
                                return <p className="timer"><b>Time Remains: </b> {time.minutes}:0{time.seconds}</p>
                            }

                            if(time.minutes < 10 && time.seconds < 10){
                                return <p className="timer"><b>Time Remains: </b> 0{time.minutes}:0{time.seconds}</p>
                            }

                            else {
                                return <p className="timer"><b>Time Remains: </b> {time.minutes}:{time.seconds}</p>
                            }
                        }}
                        </Timer>
                        <br /><br />
                        <div className="question">
                            <div className="row">
                                <h4>{this.quiz.questions[this.state.index].no}</h4>
                                <br />

                                <p>{this.quiz.questions[this.state.index].text}</p>
                                <ShowOptions options={this.quiz.questions[this.state.index].options}
                                             selected={this.state.selected} onClick={this.checkValue}/>
                            </div>
                            <br />

                            <div className="row">
                                <div className="col-md-3"><input data-field="back" className="btn btn-default"
                                                                 type="button" value="< Back" disabled={!this.state.index}
                                                                 onClick={this.changeIndex}/></div>
                                <div className="col-md-3"></div>
                                <div className="col-md-3"><input data-field="next" className="btn btn-info"
                                                                 type="button" value={this.state.buttonText}
                                                                 onClick={this.changeIndex}/></div>
                            </div>
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