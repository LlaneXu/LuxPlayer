/***

 @Time    : 2020-03-13 11:19
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : tools.py

 Description:

 Update:

 Todo:

 ***/
import Toast from 'react-native-root-toast';

export const secondToString = (time) => {
  const minute = Math.floor(time/60);
  const second = Math.floor(time%60);
  return `${minute>10? minute:(`0${minute}`)}:${second>9?second:(`0${second}`)}`
};

export function getRandomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max-min+1))+min;
}


export function switchItems(list: Array, indexA: number, indexB: number) {
  [list[indexA], list[indexB]] = [list[indexB], list[indexA]]
}


export function toast(text) {
  Toast.show(text, {
    duration: 100,
    position: -120,
  });
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
