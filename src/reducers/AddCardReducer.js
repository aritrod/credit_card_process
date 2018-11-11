import { ADD_CARD, LIST_CARDS } from '../actions/actionsTypes'

const INITIAL_DATA = []

const addCardReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case ADD_CARD:
      return [
        ...state, {
          id: action.id,
          cardName: action.cardName,
          cardNumber: action.cardNumber,
          cardLimit: action.cardLimit
        }
      ]
    case LIST_CARDS:
      return state

    default:
      return state
  }
}

export default addCardReducer