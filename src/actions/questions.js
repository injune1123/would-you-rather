import {_saveQuestionAnswer} from '../utils/_DATA'
import {_saveQuestion} from '../utils/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const CREATE_QUESTION = 'CREATE_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function answerQuestion({ authedUser, qid, answer }){
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  }
}

export function handleAnswerQuestion (info){
  return (dispatch) => {
    dispatch(answerQuestion(info))

    return _saveQuestionAnswer(info)
    .catch((e)=>{
      console.warn('Error in handleAnswerQuestion: ', e)
      alert(`There was an error selecting this answer. Try again.`)
    })
  }
}


function createQuestion(newQuestion){
  return {
    type: CREATE_QUESTION,
    newQuestion
  }
}
//{ authedUser, optionOne, optionTwo }
export function handleCreateQuestion (info){
  
  return (dispatch) => {
    return _saveQuestion(info)
    .then(
      (newQuestion) => {
        dispatch(createQuestion(newQuestion))
      }
    )
    .catch((e)=>{
      console.warn('Error in savingQuestion: ', e)
      alert(`There was an error selecting this answer. Try again.`)
    })
  }
}
