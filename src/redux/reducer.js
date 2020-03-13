/***

 @Time    : 2020-03-13 10:06
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : reducer.py

 Description:

 Update:

 Todo:

 ***/
import { combineReducers } from 'redux';
import { PLAYER } from "./actions";

const player = (state={}, action) =>  {
  switch (action.type) {
    case PLAYER.SONG_ID:
      return {...state, id: action.data.id};
    case PLAYER.SONG_STATUS:
      return {...state, ...action.data};
    default:
      return {...state};
  }
};

export default combineReducers({
  player,
})
