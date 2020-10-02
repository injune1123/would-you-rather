import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions/users';
import { handleSetAuthedUser } from '../actions/authedUser';
import { handleInitialData } from '../actions/shared';

import './App.css';

class SignIn extends Component {
  componentDidMount(){
    this.props.dispatch(getUsers())
  }

  onSelectUser(event){
    this.props.dispatch(handleSetAuthedUser(event.target.value))
    this.props.dispatch(handleInitialData())
  }

  render () {
    const {users, authedUser} = this.props
    return (
      <div className="sign-in">
        <h1>Sign In</h1>
        <h2>Welcome come to the Would you rather game</h2>
        <p>Pick a user to start</p>
        <ul>
          {Object.keys(users).map((id)=>
            <>
              <input id={users[id].id}
                checked={authedUser ? authedUser === users[id].id : false}
                type="radio"
                value={users[id].id}
                onChange={(e) => (this.onSelectUser(e))}/>
              <label htmlFor={users[id].id}>{users[id].id}</label>
            </>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {users, authedUser} = state
  return {
    users,
    authedUser : authedUser
  }
}

export default connect(mapStateToProps)(SignIn);
