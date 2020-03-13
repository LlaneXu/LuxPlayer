/***

 @Time    : 2020-03-13 11:19
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : tools.py

 Description:

 Update:

 Todo:

 ***/

export const secondToString = (time) => {
  const minute = Math.floor(time/60);
  const second = Math.floor(time%60);
  return `${minute>10? minute:(`0${minute}`)}:${second>9?second:(`0${second}`)}`
};
