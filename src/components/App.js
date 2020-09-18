import React, {Component} from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard'
import './App.css';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render (){
    return (
      <div className="App">
        {
          this.props.loading === true ? null :
          <>
            <h1>What would you like</h1>
          <Dashboard/>
          </>
        }
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
