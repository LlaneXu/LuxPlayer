/***

 @Time    : 2020-03-13 16:28
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : control.py

 Description:

 Update:

 Todo:

 ***/

import { store } from '../redux/stores';
import {PLAYER} from '../redux/actions';

export const playOrPause = () => {
  const {player} = store.getState();
  store.dispatch({
    type: PLAYER.SONG_STATUS,
    data: {
      playing: !player.playing,
    },
  });
};

export const playSong = (url) => {
  console.log(url);
  const updateData = {
    url,
    seekPos: 0,
    playing: false,
  };
  store.dispatch({
    type: PLAYER.SONG_STATUS,
    data: {
      ...updateData,
    },
  });
};

export const seek = (seekPos) => {
  store.dispatch({
    type: PLAYER.SONG_STATUS,
    data: {
      seekPos,
    },
  });
};
