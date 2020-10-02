import {RECEIVE_USERS} from '../actions/users'
import {ANSWER_QUESTION} from '../actions/questions'

export default function users (state = {}, action) {
  switch(action.type) {
    case ANSWER_QUESTION:
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
    const {qid, answer, authedUser}= action
    return {
      ...state,
      [action.authedUser]:{
        ...state[action.authedUser],
        answers: {
          ...state[action.authedUser]["answers"],
          [qid]: answer
        }
      }
    }
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    default:
      return state
  }
}
