import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard'
import Question from './Question'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import SignIn from './SignIn'
import Header from './Header'
import Nav from './Nav'
import './App.css';

class App extends Component {
  // componentDidMount(){
  //   this.props.dispatch(handleInitialData())
  // }

  render (){
    const {authedUser} = this.props
    return (
      <Router>
      <div className="App">
      {authedUser && <Header id={authedUser}/>}
        <Nav/>
        {!authedUser && <SignIn/>}
        {authedUser && (
          this.props.loading === true ? null :
          <div>
            <Route path='/signin' exact component={SignIn}/>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/add' exact component={NewQuestion}/>
            <Route path='/leaderboard' exact component={Leaderboard}/>
            <Route path='/question/:id'
            render={props => <Question {...props.match.params} />}
            />
          </div>
        )
        }
      </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
