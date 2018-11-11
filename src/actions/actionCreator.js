import { ADD_CARD } from './actionsTypes'

export const addCard = (cardName, cardNumber, cardLimit) => ({
  type: ADD_CARD,
  cardName,
  cardNumber,
  cardLimit
})