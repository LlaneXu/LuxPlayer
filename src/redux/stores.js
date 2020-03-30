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
  },
  control: {
    mode: 'cycle', //  random | cycle | cycleOne
    historyList: {
      name: '',
      data: [],
    },
    lastList: {
      name: '',
      data: [],
    },
    playList: {
      name: '',
      data: [],
    },
    playIndex: [],
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

console.log(store.getState());
