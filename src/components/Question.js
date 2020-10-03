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

    const {authedUser, question, loading} = this.props
    if(loading) {
      return <p>Loading...</p>
    }
    if(!question) {
      return <p>404 This question does not exist</p>
    }

    const votesForOption1 = this.props.question.optionOne.votes
    const votesForOption2 = this.props.question.optionTwo.votes
    const numOfVotesForOption1 = votesForOption1.length
    const numOfVotesForOption2 = votesForOption2.length
    const perctOfOption1Votes = Number.parseFloat(100 * numOfVotesForOption1/(numOfVotesForOption1+numOfVotesForOption2)).toFixed(2);
    const perctOfOption2Votes = Number.parseFloat(100 * numOfVotesForOption2/(numOfVotesForOption1+numOfVotesForOption2)).toFixed(2);
    const selectedOptionOne = votesForOption1.indexOf(authedUser) > -1
    const selectedOptionTwo = votesForOption2.indexOf(authedUser) > -1

    const answered = selectedOptionOne || selectedOptionTwo

    debugger;
    // const
    console.log("!!!!this.props", this.props)

    const {avatar, id, name, optionOne, optionTwo, timestamp} = question

    return (
      <div className = 'question'>
        {/* <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        /> */}
        <h1>A Question</h1>
        {answered ? <p>Answered</p> : <p>To Be Answered</p>}

        <h3>

          {` Would you rather`}
          </h3>

        <input
          className={'hidden'}
          type="radio"
          key={`${id}-optionOne`}
          id={`${id}-optionOne`}
          name={`${optionOne.text} or ${optionTwo.text}`}
          value='optionOne'
          checked={selectedOptionOne}
          onChange={(e) => (this.handleOptionChange(e))}
        />
        <label className={`option ${selectedOptionOne? 'selected' : 'unSelected'}`} htmlFor={`${id}-optionOne`}>{optionOne.text}</label>
        <p>{answered && `In total, ${numOfVotesForOption1} people (${perctOfOption1Votes}%) voted for this option. `}</p>
        <br/>

        <input
          className={'hidden'}
          type="radio"
          key={`${id}-optionTwo`}
          id={`${id}-optionTwo`}
          name={`${optionOne.text} or ${optionTwo.text}`}
          value={'optionTwo'}
          checked={selectedOptionTwo}
          onChange={(e) => (this.handleOptionChange(e))}
        />

        <label className={`option ${selectedOptionTwo? 'selected' : 'unSelected'}`} htmlFor={`${id}-optionTwo`}>{optionTwo.text}</label>
        <p>{answered && `In total, ${numOfVotesForOption2} people  (${perctOfOption2Votes}%) voted for this option.`}</p>
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

  const question = questions[id]
  return {
    loading: !Object.keys(users).length || !Object.keys(questions).length,
    authedUser,
    question: question? formatQuestion(question, users[question.author], authedUser) : null
  }
}

export default connect(mapStateToProps)(Question)
