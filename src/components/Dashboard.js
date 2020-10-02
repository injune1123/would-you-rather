import React, {Component} from 'react'
import { connect } from 'react-redux'
import SignIn from './SignIn'
import NewQuestion from './NewQuestion'
import QuestionOverview from './QuestionOverview'
import Leaderboard from './Leaderboard'

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {questions: 'unanswered'};
    this.renderQuestions = this.renderQuestions.bind(this);

  }

  onChangeQuestionsType (e) {
    this.setState({questions: e.target.value})
  }

  renderQuestions(answered) {
    debugger;
    const questionIds = answered? this.props.answeredQuestionIds : this.props.unAnsweredQuestionIds;
    return questionIds.map((id)=>(
      <QuestionOverview key={id} id={id}/>
    ))
  }

  render() {
    return (
      <div>
        <Leaderboard/>
        <SignIn/>
        <NewQuestion/>

      <input id='unanswered-question-nav'
        checked={this.state.questions==="unanswered"}
        type="radio"
        value='unanswered'
        onChange={(e) => (this.onChangeQuestionsType(e))}/>
      <label htmlFor='unanswered-question-nav'> Questions To Be Answered</label>

      <input id='answered-question-nav'
        checked={this.state.questions==="answered"}
        type="radio"
        value='answered'
        onChange={(e) => (this.onChangeQuestionsType(e))}/>
      <label htmlFor='answered-question-nav'> Answered questions</label>


      {this.renderQuestions(this.state.questions==="answered")}

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
