import { ANSWER_QUESTION, RECEIVE_QUESTIONS } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    //  in users object
    //  the authed user property
    // will have the answered question stored in
    // its answers object
    // ...,
    // authedUser: {
    // ...
    //   answers: {
    //  "question": 'optionOne',
    // },
    // in the questions object
    // the option's vote array will also be updated
    // by adding the user id into it
    case ANSWER_QUESTION:
      const {qid, answer, authedUser}= action

      const getVotes = function (answer, getVotesForOption1or2, qid, state) {
        const votes = state[qid][getVotesForOption1or2].votes
        // When getting an option'votes votes and the option is selected
        if(getVotesForOption1or2 === answer) {
          // return all the existing votes together with this new user's vote
          // filter is used to prevent duplication
          return [...votes.filter(user => user !== authedUser),authedUser]
        } else {
          // When getting an option's votes and that option is not selected
          // return the existing votes without the current user's vote
          return votes.filter(user => user !== authedUser)
        }
      }
      return {
        ...state,
        [qid]:{
          ...state[qid],
          ['optionOne']:{
            ...state[qid]['optionOne'],
            votes: getVotes(answer, 'optionOne', qid, state)
          },
          ['optionTwo']:{
            ...state[qid]['optionTwo'],
            votes: getVotes(answer, 'optionTwo', qid, state)
          }
        }
      }

    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    default:
      return state
  }
}
