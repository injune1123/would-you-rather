import React, {Component} from 'react'
import { connect } from 'react-redux'
import {formatDate, formatQuestion} from '../utils/helpers'
import { handleAnswerQuestion } from '../actions/questions';
import {RiThumbUpLine} from "react-icons/ri";
import {RiThumbUpFill} from "react-icons/ri";
import './Question.css';

class Question extends Component {
  handleOptionChange(event) {
    this.props.dispatch(handleAnswerQuestion({
      authedUser: this.props.authedUser,
      qid: this.props.id,
      answer: event.target.value
    }))
  }
  render() {
    const {question} = this.props
    if(!question) {
      return <p>This question does not exist</p>
    }

    const {avatar, id, name, optionOne, optionTwo, timestamp} = question

    return (
      <div className = 'question'>
        {/* <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        /> */}
        <h3>
        ({(this.props.selectedOptionOne || this.props.selectedOptionTwo) ? 'Answered' : 'UnAnswered'})

          {` Would you rather`}
          </h3>

        <input
          className={'hidden'}
          type="radio"
          key={`${id}-optionOne`}
          id={`${id}-optionOne`}
          name={`${optionOne.text} or ${optionTwo.text}`}
          value='optionOne'
          checked={this.props.selectedOptionOne}
          onChange={(e) => (this.handleOptionChange(e))}
        />
        <label className={`option ${this.props.selectedOptionOne? 'selected' : 'unSelected'}`} htmlFor={`${id}-optionOne`}>{optionOne.text}</label>
        <br/>

        <input
          className={'hidden'}
          type="radio"
          key={`${id}-optionTwo`}
          id={`${id}-optionTwo`}
          name={`${optionOne.text} or ${optionTwo.text}`}
          value={'optionTwo'}
          checked={this.props.selectedOptionTwo}
          onChange={(e) => (this.handleOptionChange(e))}
        />

        <label className={`option ${this.props.selectedOptionTwo? 'selected' : 'unSelected'}`} htmlFor={`${id}-optionTwo`}>{optionTwo.text}</label>
        <br/>

        <div className='question-info'>
          <span>{`-- `+name}</span>
          <div>{`@` + formatDate(timestamp)}</div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users, questions}, {id}) {
  console.log("!!!!!!!!!!!this.props", this.props)

  console.log("!!!!!!!!!!!authedUser", authedUser)
  console.log("!!!!!!!!!!!users", users)
  console.log("!!!!!!!!!!!questions", questions)
  console.log("!!!!!!!!!!!id", id)

  const question = questions[id]
  console.log("!!!!!!!!!!!question", question)
  return {
    authedUser,
    question: question? formatQuestion(question, users[question.author], authedUser) : null,
    selectedOptionOne: question.optionOne.votes.indexOf(authedUser) > -1,
    selectedOptionTwo: question.optionTwo.votes.indexOf(authedUser) > -1,
  }
}

export default connect(mapStateToProps)(Question)
