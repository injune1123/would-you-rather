import React, {Component} from 'react'
import { connect } from 'react-redux'
import {formatDate, formatQuestion} from '../utils/helpers'
import {RiThumbUpLine} from "react-icons/ri";
import {RiThumbUpFill} from "react-icons/ri";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedAnswer: ''};

    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(event) {
    this.setState({selectedAnswer: event.target.value});

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
        <span>? Answered : unAnswered</span>
        <h3>{` Would you rather...`}</h3>

        <input
          type="radio"
          key={`${id}-${optionOne.text}`}
          id={`${id}-${optionOne.text}`}
          name={`${optionOne.text} or ${optionTwo.text}`}
          value={optionOne.text}
          checked={this.state.selectedAnswer===optionOne.text}
          onChange={this.handleOptionChange}
        />
        <label htmlFor={`${id}-${optionOne.text}`}>{optionOne.text}</label>
        <br/>

        <input
          type="radio"
          key={`${id}-${optionTwo.text}`}
          id={`${id}-${optionTwo.text}`}
          name={`${optionOne.text} or ${optionTwo.text}`}
          value={optionTwo.text}
          checked={this.state.selectedAnswer===optionTwo.text}
          onChange={this.handleOptionChange}
        />

        <label htmlFor={`${id}-${optionTwo.text}`}>{optionTwo.text}</label>
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
    authedUser,
    question: question? formatQuestion(question, users[question.author], authedUser) : null
  }
}

export default connect(mapStateToProps)(Question)
