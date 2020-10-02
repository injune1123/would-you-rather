import React, {Component} from 'react'
import { signOut } from '../actions/authedUser';
import { connect } from 'react-redux'
import './Header.css'
class Header extends Component {

  signOut (){
    this.props.dispatch(signOut())
  }
  render() {
    const {user} = this.props
    return (
      <div className='header'>
      <p className='logged-in-user'>
        {user.id}
      </p>
      <p className='sign-out' onClick={()=>this.signOut()}>
        <u>sign out</u>
      </p>
      </div>
    )
  }
}

function mapStateToProps({users}, {id}) {

  return {
    user: users[id],
  }
}

export default connect(mapStateToProps)(Header)
