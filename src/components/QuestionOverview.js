import React, {Component} from 'react'
import { connect } from 'react-redux'
import {formatDate, formatQuestion} from '../utils/helpers'
import {RiThumbUpLine} from "react-icons/ri";
import {RiThumbUpFill} from "react-icons/ri";


class QuestionOverview extends Component {
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
        <h3>{` Would you rather ${optionOne.text}, or ${optionTwo.text}?`}</h3>

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

export default connect(mapStateToProps)(QuestionOverview)
