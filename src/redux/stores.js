/***

 @Time    : 2020-03-13 16:30
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : stores.py

 Description:

 Update:

 Todo:

 ***/

import { createStore } from 'redux';
import reducer from './reducer';
import {PLAYER} from "./actions";

export const modeOptions = {
  cycle: '循环',
  cycleOne: '单曲循环',
  random: '随机',
};

export let store = createStore(reducer, {
  player: {
    id: 0,
    playing: false,
    url: '',
    seekPos: 0,
    platformIndex: 0,
    data: {},
  },
  slider: {
    currentTime: 0,
    progress: 0,
  },
  control: {
    mode: 'cycle', //  random | cycle | cycleOne
    historyListObj: {
      id: null,
      name: '',
      data: [],
    },
    lastListObj: {
      id: null,
      name: '',
      data: [],
    },
    playListObj: {
      id: null,
      name: '',
      data: [],
    },
    randomTable: null,
    currentIndex: 0,
  },
  personalized: {
    loading: false,
    data: [],
  }
});

/***
  playList example:
 [{
  id: 123,
  platform: 'netease',
  platformId: 456,
  played: true,
  url: '',
  artist: [{name: 'xxx'}],
  name: 'some song',
 }]
 */

// let currentListObj = {};
// function handleChange() {
//   let prev = currentListObj;
//   const {player, control} = store.getState();
//   let current = control.playListObj;
//   if (current.id !== prev.id) {
//     console.log(`found playlist change from ${prev.id} to ${current.id}`);
//     // store.dispatch({
//     //   type: PLAYER.DATA,
//     //   data: control.playListObj.data[control.currentIndex],
//     // });
//     console.log(store.getState());
//   }
// }
//
// store.subscribe(handleChange)
console.log(store.getState());
