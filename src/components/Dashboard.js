import React, {Component} from 'react'
import { connect } from 'react-redux'
import SignIn from './SignIn'
import NewQuestion from './NewQuestion'
import QuestionOverview from './QuestionOverview'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <SignIn/>
        <NewQuestion/>
      <h3> Answered Questions</h3>
      <ul>
        {this.props.answeredQuestionIds.map((id)=>(
          <>
          <QuestionOverview key={id} id={id}/>
          </>
        ))}
      </ul>
      <h3> unAnswered Questions</h3>
      <ul>
        {this.props.unAnsweredQuestionIds.map((id)=>(
            <QuestionOverview key={id} id={id}/>
        ))}
      </ul>
      </div>)
  }
}

function mapStateToProps({ questions, authedUser, users }) {
  return {
    answeredQuestionIds: Object.keys(questions)
    .filter(questionId =>  users[authedUser].questions.includes(questionId))
    .sort((a,b)=> questions[b].timestamp - questions[a].timestamp),
    unAnsweredQuestionIds: Object.keys(questions)
    .filter(questionId =>  !users[authedUser].questions.includes(questionId))
    .sort((a,b)=> questions[b].timestamp - questions[a].timestamp)
  }
}
export default connect(mapStateToProps)(Dashboard)
