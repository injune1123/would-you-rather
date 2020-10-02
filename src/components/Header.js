import React, {Component} from 'react'
import { connect } from 'react-redux'
import './Header.css'
class Header extends Component {

  render() {
    const {user} = this.props
    return (
      <div className='header'>
      <p className='logged-in-user'>
        {user.id}
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
