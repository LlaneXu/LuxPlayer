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
    case PLAYER.PLAYING:
      return {...state, playing: action.data};
    case PLAYER.STATUS:
      return {...state, ...action.data};
    case PLAYER.DATA:
      return {...state, id: action.data.id, data: action.data};
    default:
      return {...state};
  }
};

const control = (state={}, action) =>  {
  switch (action.type) {
    case CONTROL.MODE:
      return {...state, mode: action.data};
    case CONTROL.NEW_LIST:
      // console.log(action);
      // const {playListObj, currentIndex} = action.data;
      // if (playListObj.id === state.playListObj.id) {
      //   console.log('equal:',playListObj.id,state.playListObj.id)
      //   return {
      //     ...state,
      //     currentIndex,
      //   }
      // } else {
      //   console.log('not equal:',playListObj.id,state.playListObj.id)
      //   return {
      //     ...state,
      //     currentIndex,
      //     playListObj,
      //     lastListObj: state.playListObj,
      //     historyListObj: state.lastListObj,
      //   };
      // }
    case CONTROL.CURRENT_INDEX:
      // return {...state, currentIndex: action.data};
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


const combinedReducer = combineReducers({
  player,
  control,
  personalized,
});
const crossSliceReducer = (state, action) => {
  let {player, control} = state;
  const {data} = action;
  switch (action.type) {
    case CONTROL.NEW_LIST:
      if (data.playListObj.id === control.playListObj.id) {
        control = {
          ...control,
          currentIndex: data.currentIndex,
        };
        player = {
          ...player,
          id: data.playListObj.data[data.currentIndex].id,
          platformIndex: 0,
          data: data.playListObj.data[data.currentIndex],
        };
        return {
          ...state,
          player,
          control,
        }
      } else {
        control = {
          ...control,
          currentIndex: data.currentIndex,
          playListObj: data.playListObj,
          lastListObj: control.playListObj,
          historyListObj: control.lastListObj,
        };
        player = {
          ...player,
          id: data.playListObj.data[data.currentIndex].id,
          platformIndex: 0,
          data: data.playListObj.data[data.currentIndex],
        };
        return {
          ...state,
          player,
          control,
        };
      }
    case CONTROL.CURRENT_INDEX:
      control = {
        ...control,
        currentIndex: data.currentIndex,
      };
      player = {
        ...player,
        id: data.playListObj.data[data.currentIndex].id,
        platformIndex: 0,
        data: data.playListObj.data[data.currentIndex],
      };
      return {
        ...state,
        player,
        control,
      };
    default:
      return {...state};
  }
};

export default (state, action) => {
  const intermediateState = combinedReducer(state, action);
  return crossSliceReducer(intermediateState, action)
};
