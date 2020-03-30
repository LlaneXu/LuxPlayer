/***

 @Time    : 2020-03-29 21:57
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : index.py

 Description:

 Update:

 Todo:

 ***/
import http from '../utils/http';

const host = 'http://localhost:8000';
const base = `${host}/api/v1`;

export function personalized(platform='netease') {
  return http.get(`${base}/personalized/${platform}/`);
}
