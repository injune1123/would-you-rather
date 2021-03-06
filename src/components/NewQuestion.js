import React, {Component} from 'react'
import { connect } from 'react-redux'
import { handleCreateQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';

import './NewQuestion.css';



class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = { option1: '',option2: '', toHome: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeOption1 = this.handleChangeOption1.bind(this);
    this.handleChangeOption2 = this.handleChangeOption2.bind(this);
  }

   handleSubmit () {
    this.props.dispatch(
      handleCreateQuestion({
        author: this.props.authedUser,
        optionOneText: this.state.option1,
        optionTwoText: this.state.option2
    })
    )
    this.setState({toHome: true})

  }


  handleChangeOption1(event) {
    this.setState({option1: event.target.value});
  }

  handleChangeOption2(event) {
    this.setState({option2: event.target.value});
  }

  render() {
    if(this.state.toHome) {
      return <Redirect to="/"/>
    }
    return (
      <div className = 'new-question'>
        <h1>Create A New Question</h1>
        <span>Complete the question below</span>

        <h2>Would you rather
        &nbsp;
          <input
            className = 'input-option'
            type="text"
            name="optionOne"
            value={this.state.option1}
            onChange={this.handleChangeOption1}
          />
      &nbsp;
          or
      &nbsp;
          <input
            type="text"
            name="optionTwo"
            className = 'input-option'

            value={this.state.option2}
            onChange={this.handleChangeOption2}
          />?


        </h2>

        <button disabled={!this.state.option1 ||!this.state.option2 }onClick={this.handleSubmit}> Submit My Question</button>
      </div>

    )
  }
}


function mapStateToProps({authedUser}) {
  return {
    authedUser
  }
}


export default  connect(mapStateToProps)(NewQuestion)
