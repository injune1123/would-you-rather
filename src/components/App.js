import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import Question from './Question'
import './App.css';

class App extends Component {
  // componentDidMount(){
  //   this.props.dispatch(handleInitialData())
  // }

  render (){
    return (
      <Router>
      <div className="App">
        {
          this.props.loading === true ? null :
          <div>
            <Route path='/' exact component={SignIn}/>
            <Route path='/dashboard' exact component={Dashboard}/>
            <Route path='/question/:id'
            render={props => <Question {...props.match.params} />}
            />
          </div>
        }
      </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  // return {
  //   loading: authedUser === null
  // }
}

export default connect(mapStateToProps)(App);
