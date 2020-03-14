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
import { PLAYER, CONTROL } from "./actions";

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

const control = (state={}, action) =>  {
  switch (action.type) {
    case CONTROL.MODE:
      return {...state, mode: action.data.mode};
    case CONTROL.PLAY_LIST:
      console.log(action);
      return {...state, playList: action.data.playList};
    case CONTROL.PLAYED_LIST:
      return {...state, playedList: action.data.playedList};
    case CONTROL.CURRENT_INDEX:
      return {...state, currentIndex: action.data.currentIndex};
    default:
      return {...state};
  }
};

export default combineReducers({
  player,
  control,
})
