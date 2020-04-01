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

// const host = 'http://localhost:8000';
const host = 'http://100.65.135.181:8000';
const base = `${host}/api/v1`;

function parseParam(params) {
  const parsedList =[];
  Object.keys(params).forEach((key) => {
    if (Array.isArray(params[key])) {
      params[key].forEach(item => {
        parsedList.push(`${key}=${item}`);
      })
    } else {
      parsedList.push(`${key}=${params[key]}`)
    }
  });
  return parsedList.join('&')
}

function personalized(platform='netease') {
  return http.get(`${base}/personalized/${platform}/`);
}

function playlist(platform='netease', id) {
  return http.get(`${base}/playlist/${platform}/?id=${id}`);
}

function album(platform='netease', id) {
  return http.get(`${base}/album/${platform}/?id=${id}`);
}

function url(platform='netease', params={}) {
  const query = parseParam(params);
  return http.get(`${base}/url/${platform}/?${query}`);
}

export default {
  personalized,
  playlist,
  album,
  url,
}
