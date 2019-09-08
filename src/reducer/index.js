import { stat } from "fs"

const initialState = {
  current_user: null
}

export default function (state = initialState, {type, payload}) {
  switch(type) {
    case 'LOGIN': 
      return {
        ...state,
        current_user: payload
      }
    default:
      return state;
  }
}