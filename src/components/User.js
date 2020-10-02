import React, {Component} from 'react'
import { connect } from 'react-redux'
import {formatDate, formatQuestion} from '../utils/helpers'
import { handleAnswerQuestion } from '../actions/questions';

class User extends Component {

  render() {
    const {user} = this.props
    console.log("user", user)

    return (
      <div className = 'user'>
        {/* <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        /> */}
        <h2>{user.id}</h2>
        <h3>Answered questions:  {Object.keys(user.answers).length}</h3>
        <h3>Asked questions: {user.questions.length} </h3>

      </div>
    )
  }
}

function mapStateToProps({authedUser, users, questions}, {id}) {

  return {
    user: users[id],
  }
}

export default connect(mapStateToProps)(User)
