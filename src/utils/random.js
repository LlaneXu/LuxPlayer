/***

 @Time    : 2020-04-01 18:46
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : random.py

 Description:

 Update:

 Todo:

 ***/
import {getRandomIntBetween, switchItems} from "./tools";

export default class Random {
  constructor(length) {
    const list = [...Array(length)].map((item, index) => index);
    list.forEach((item, index) => {
      const pos = getRandomIntBetween(index, length-1)
      switchItems(list, index, pos)
    });
    this.list = list;
  }
  getIndex(){
    return self.index;
  }
  getNext(item){
    let index = this.list.indexOf(item);
    index++;
    if (index>=this.list.length){
      index = 0;
    }
    return this.list[index]
  }
}
