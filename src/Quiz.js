import React, {Component} from 'react';
import Header from './Header';
import Clock from './Clock';
import { hashHistory } from 'react-router';

class QuizInfo extends Component {
    render(){
        return(
            <div>
                <p>
                    This Quiz consist of 10 Multiple Choice Questions (MCQ's), some rules for attempting Quiz are as follows:
                </p>
                <br />
                <ol>
                    <li>Attempt all Question, all question carry equal marks(10 marks each)</li>
                    <li>Select only one option for each question</li>
                    <li>You have one minute to solve each question</li>
                </ol>
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
            sec: 59
        };
        this.changeIndex = this.changeIndex.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.finishQuiz = this.finishQuiz.bind(this);
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

        let Comp = <QuizInfo />

        //function StartButton(props){
        //    function startQuiz(){
        //        Comp =
        //            <div>
        //                <p className="timer"><b>Time Remains: </b> {this.state.min}:{this.state.sec}</p>
        //                <h2>{this.quiz.title}</h2>
        //                <div className="question">
        //                    <h4>{this.quiz.questions[this.state.index].no}</h4>
        //                    <p>{this.quiz.questions[this.state.index].text}</p>
        //                    <ShowOptions options={this.quiz.questions[this.state.index].options}
        //                                 selected={this.state.selected} onClick={this.checkValue}/>
        //                    <br />
        //                    <input data-field="back" type="button" value="< Back" onClick={this.changeIndex}/>
        //                    <input data-field="next" className="left-spaces" type="button" value={this.state.buttonText} onClick={this.changeIndex}/>
        //                </div>
        //            </div>
        //    }
        //    return(
        //        <button type={props.type} onClick={startQuiz}>{props.value}</button>
        //    )
        //}


        function ShowOptions(props){
            let options = props.options;
            return(
                <table>
                    <tbody>
                    <tr>
                        <td><input name="optionA" type="radio" value={options.a} checked={props.selected === options.a} onChange={props.onClick}/>a. {options.a}</td>
                        <td><input name="optionB" type="radio" value={options.b} checked={props.selected === options.b} onChange={props.onClick}/>b. {options.b}</td>
                    </tr>
                    <tr>
                        <td><input name="optionC" type="radio" value={options.c} checked={props.selected === options.c} onChange={props.onClick}/>c. {options.c}</td>
                        <td><input name="optionD" type="radio" value={options.d} checked={props.selected === options.d} onChange={props.onClick}/>d. {options.d}</td>
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
                    <input type="button" value="Show Result" onClick={this.finishQuiz} />
                </div>
        }
        else{
            {
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
                            <input data-field="back" type="button" value="< Back" onClick={this.changeIndex}/>
                            <input data-field="next" className="left-spaces" type="button" value={this.state.buttonText} onClick={this.changeIndex}/>
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
//<StartButton type="button" value="Start Quiz" />
}

export default Quiz;