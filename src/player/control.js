/***

 @Time    : 2020-03-13 16:28
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : control.py

 Description:

 Update:

 Todo:

 ***/

import { store, modeOptions } from '../redux/stores';
import {PLAYER, CONTROL} from '../redux/actions';
import Toast from 'react-native-root-toast';
// import { Toast } from '@ant-design/react-native';
import { getRandomIntBetween, switchItems } from '../utils/tools';

let playerRef=null;

export const updateRef = (ref) => {
  if (!playerRef) {
    playerRef = ref;
  }
};

/*
0 周深
1 薛之谦
2 小情歌
3 陈奕迅
 */
const testUrl = [
  'http://music.163.com/song/media/outer/url?id=1425818683.mp3',
  'http://biliblue.com/static/music/%E8%96%9B%E4%B9%8B%E8%B0%A6/%E7%BB%85%E5%A3%AB/%E8%96%9B%E4%B9%8B%E8%B0%A6%20-%20%E6%BC%94%E5%91%98.m4a',
  'http://biliblue.com/static/music/%E8%8B%8F%E6%89%93%E7%BB%BF/%E5%B0%8F%E5%AE%87%E5%AE%99/%E8%8B%8F%E6%89%93%E7%BB%BF%20-%20%E5%B0%8F%E6%83%85%E6%AD%8C.m4a',
  'http://biliblue.com/static/music/%E5%BC%A0%E5%AE%87/%E7%94%A8%E5%BF%83%E8%89%AF%E8%8B%A6/%E5%BC%A0%E5%AE%87%20-%20%E7%94%A8%E5%BF%83%E8%89%AF%E8%8B%A6.m4a',
];

const playList = testUrl.map((item,index) => {
  return {
    id: index,
    url: item,
  }
});
store.dispatch({
  type: CONTROL.PLAY_LIST,
  data: {
    playList,
  }
});

function test() {
  const playList = [...Array(20)].map((item, index) => ({id: index}));
  // console.log(unshiftListWithoutRepeat(playList,{id:3}));
  //
  // console.log(unshiftListWithoutRepeat(playList,{id:0}));
  // console.log(unshiftListWithoutRepeat(playList,{id:2}));
  // console.log(unshiftListWithoutRepeat(playList,{id:4}));
  // console.log(unshiftListWithoutRepeat(playList,{id:34}));
  console.log(getRandomIntBetween(5,20))
  console.log(getRandomIntBetween(5,20))
  console.log(getRandomIntBetween(5,20))
  console.log(getRandomIntBetween(5,20))
  console.log(getRandomIntBetween(1,1))
  console.log(getRandomIntBetween(3,3))
  // switchItems(playList, 5,12);
  // console.log(playList)
}
test();

const getUrlByID = (id) => {
  return testUrl[id];
};

export const playOrPause = () => {
  const {player, control} = store.getState();
  Toast.show(player.playing? '暂停':'播放', {
    duration: 100,
    position: -120,
  });
  if (!player.url) {
    console.log(getUrlByID(control.currentIndex));
    playSong(getUrlByID(control.currentIndex));
  } else {
    store.dispatch({
      type: PLAYER.SONG_STATUS,
      data: {
        playing: !player.playing,
      },
    });
  }
};

export const playSong = (url) => {
  console.log(url);
  const updateData = {
    url,
    seekPos: 0,
    // playing: false,
  };
  store.dispatch({
    type: PLAYER.SONG_STATUS,
    data: {
      ...updateData,
    },
  });
};

export const seek = (seekPos) => {
  const {player} = store.getState();
  console.log(seekPos);
  store.dispatch({
    type: PLAYER.SONG_STATUS,
    data: {
      sliderProgress: seekPos,
      // seekPos: seekPos*player.duration,
    },
  });
  if (playerRef) {
    playerRef.seek(seekPos * player.duration);
  }
};
const unshiftListWithoutRepeat = (list, item) => {
  const repeatIndex = list.findIndex(one => one.id === item.id);
  console.log(repeatIndex)
  if (repeatIndex !== -1) list.splice(repeatIndex, 1)
  list.unshift(item);
  return list;
};

export const playNext = (manual=true) => {
  const { control: {mode, playList, playedList, currentIndex} } = store.getState();
  const { control} = store.getState();

  Toast.show('下一首', {
    duration: 100,
    position: -130,
  });

  console.log('playList', playList)
  console.log('currentIndex', currentIndex)
  console.log('mode', mode);
  let nextSong = null;
  let nextIndex = null;
  switch (mode) {
    case 'cycleOne':
      console.log('coming in cycleOne')
      if (manual) {
        console.log('manual ', manual)
        nextIndex = currentIndex + 1;
        if (nextIndex >= playList.length) {
          nextIndex = 0;
        }
      } else {
        nextIndex = currentIndex;
      }
      nextSong = playList[currentIndex];
      unshiftListWithoutRepeat(playedList, nextSong);
      break;
    case 'cycle':
      console.log('coming in cycle')
      nextIndex = currentIndex + 1;
      if (nextIndex >= playList.length) {
        nextIndex = 0;
      }
      nextSong = playList[nextIndex];
      unshiftListWithoutRepeat(playedList, nextSong);
      break;
    // case 'sequence':
    //   nextIndex = currentIndex + 1;
    //   if (nextIndex >= playList.length) {
    //     nextIndex = playList.length-1;
    //     Toast.show('已经是最后了亲', {
    //       duration: 300,
    //       position: -130,
    //     });
    //     // Toast.info('已经是最后了亲', 1);
    //   } else {
    //     nextSong = playList[nextIndex];
    //     unshiftListWithoutRepeat(playedList, nextSong);
    //   }
    //   break;
    case 'random':
      console.log('coming in random')
      nextIndex = currentIndex + 1;
      if (nextIndex >= playList.length) {
        nextIndex = 0;
      }
      const pickedIndex = getRandomIntBetween(nextIndex, playList.length-1);
      Toast.show(`picked id:${pickedIndex}`,{position: -100});
      nextSong = playList[pickedIndex];
      switchItems(playList, nextIndex, pickedIndex);
      unshiftListWithoutRepeat(playedList, nextSong);
      break;
    default:
      break;
  }
  Toast.show(`id:${nextIndex}`);
  store.dispatch({
    type: CONTROL.CURRENT_INDEX,
    data: {
      currentIndex: nextIndex,
    }
  });
  store.dispatch({
    type: CONTROL.PLAY_LIST,
    data: {
      playList,
    }
  });
  store.dispatch({
    type: CONTROL.PLAYED_LIST,
    data: {
      playedList,
    }
  });
  console.log(nextIndex, nextSong)
  if (nextSong) {
    let url = nextSong.url;
    if (!url) {
      url = getUrlByID(nextSong.url)
    }
    playSong(url);
  }
};

export const playPrev = () => {
  const { control: {playList, playedList, currentIndex} } = store.getState();
  Toast.show('上一首', {
    duration: 100,
    position: -130,
  });
  let nextIndex = currentIndex-1;
  let nextSong;
  if (nextIndex < 0) {
    nextIndex = 0;
    Toast.show('已经是第一首了亲', {
      duration: 200,
      position: -130,
    });
  } else {
    nextSong = playList[nextIndex];
    unshiftListWithoutRepeat(playedList, nextSong);
  }

  store.dispatch({
    type: CONTROL.CURRENT_INDEX,
    data: {
      currentIndex: nextIndex,
    }
  });
  // store.dispatch({
  //   type: CONTROL.PLAY_LIST,
  //   data: {
  //     playList,
  //   }
  // });
  store.dispatch({
    type: CONTROL.PLAYED_LIST,
    data: {
      playedList,
    }
  });

  if (nextSong) {
    let url = nextSong.url;
    if (!url) {
      url = getUrlByID(nextSong.url)
    }
    playSong(url);
  }
};

export const changeMode = () => {
  const { control: {mode} } = store.getState();
  const options = Object.keys(modeOptions);
  let index = options.indexOf(mode);
  index++;
  if (index === -1 || index === options.length) {
    index = 0;
  }
  Toast.show(modeOptions[options[index]], {
    duration: 100,
    position: -130,
  });
  store.dispatch({
    type: CONTROL.MODE,
    data: {
      mode: options[index]
    }
  });
};
