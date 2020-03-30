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
import { PLAYER, CONTROL, API } from "./actions";

const player = (state={}, action) =>  {
  switch (action.type) {
    case PLAYER.SONG_ID:
      return {...state, id: action.data};
    case PLAYER.SONG_STATUS:
      return {...state, ...action.data};
    default:
      return {...state};
  }
};

const control = (state={}, action) =>  {
  switch (action.type) {
    case CONTROL.MODE:
      return {...state, mode: action.data};
    case CONTROL.PLAY_LIST:
      console.log(action);
      return {
        ...state,
        playList: action.data,
        lastList: state.playList,
        historyList: state.lastList,
      };
    case CONTROL.CURRENT_INDEX:
      return {...state, currentIndex: action.data};
    default:
      return {...state};
  }
};

const personalized = (state={}, action) =>  {
  switch (action.type) {
    case API.LOADING:
      return {...state, loading: action.data};
    case API.UPDATE_LIST:
      return {...state, data: [...state.data,...action.data]};
    case API.UPDATE_OBJECT:
      return {...state, data: {...state.data,...action.data}};
    case API.NEW:
      return {...state, data: action.data};
    default:
      return {...state};
  }
};

export default combineReducers({
  player,
  control,
  personalized,
})
