import React, {Component} from 'react'
import User from './User'
import { connect } from 'react-redux'

class Leaderboard extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <>
        <h1>Leader Board</h1>
    <ol>{this.props.users.map(id=>
    <User key={id} id={id}/>)}</ol>
      </>)
  }
}

function mapStateToProps({ questions, authedUser, users }) {
  console.log("users", users)
  return {
    users: Object.keys(users)
    .sort((a,b)=> (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)),
  }
}
export default connect(mapStateToProps)(Leaderboard)
