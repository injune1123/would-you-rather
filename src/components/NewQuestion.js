import React, {Component} from 'react'
import { connect } from 'react-redux'
import { handleCreateQuestion } from '../actions/questions';

import './NewQuestion.css';



class NewQuestion extends Component {
  // const [option1, setOption1] = useState();
  // const [option2, setOption2] = useState();
  // const option1Ref = React.useRef(option1);
  // const option2Ref = React.useRef(option2);
  constructor(props) {
    super(props);
    this.state = { option1: null,option2: null };
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
  }


  handleChangeOption1(event) {
    this.setState({option1: event.target.value});
  }

  handleChangeOption2(event) {
    this.setState({option2: event.target.value});
  }

  render() {

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

        <button onClick={this.handleSubmit}> Submit My Question</button>
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
