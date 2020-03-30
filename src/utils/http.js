/***

 @Time    : 2020-03-29 21:36
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : http.py

 Description:

 Update:

 Todo:

 ***/

import Toast from 'react-native-root-toast';

export default class http {
  static checkStatus(response) {//检查响应状态
    if(response.status >= 200 && response.status < 300) {//响应成功
      return response;
    }
    if(response.status === 301 || response.status === 302) {//重定向
      // window.location = response.headers.get('Location');
      Toast.show(`请求错误: ${response.status}`, {
        duration: 100,
        position: -120,
      });
    }
    // const error = new Error(response.statusText);
    // error.data = response;
    throw new Error(response.statusText);
  }

  static async parseResult(response) {//解析返回的结果
    const contentType = response.headers.get('Content-Type');
    if(contentType != null) {
      if(contentType.indexOf('text') > -1) {
        return await response.text()
      }
      if(contentType.indexOf('form') > -1) {
        return await response.formData();
      }
      if(contentType.indexOf('video') > -1) {
        return await response.blob();
      }
      if(contentType.indexOf('json') > -1) {
        return await response.json();
      }
    }
    return await response.text();
  }
  // static async processResult(response) {
  //   let _response = http.checkStatus(response);
  //   _response = await http.parseResult(_response);
  //   return _response;
  // }
  static async processResult(response) {
    const _response = http.checkStatus(response);
    const json = await _response.json();
    if (json.code !== 0 ){
      throw new Error(`code error(${json.code}): ${json.message}`);
    }
    return json.data;
  }
  static async _request(url, option, headers = {}) {
    try {
      let options = Object.assign(
        {
          credentials: 'include',//允许跨域
        },
        option
      );
      options.headers = Object.assign({}, options.headers || {}, headers || {});
      let response = await fetch(url, options);
      response = await http.processResult(response);//这里是对结果进行处理。包括判断响应状态和根据response的类型解析结果
      return response;
    } catch(error) {
      throw error;
    }
  }
  static async get(url, data = {}, headers = {}) {
    const query = Object.keys(data).map((key) => {
      return `${key}=${data[key]}`;
    }).join('&');
    return await http._request(`${url}${query ? `?${query}` : ''}`, headers, {});
  }
  static async post(url, data = {}, headers = {}) {//通过headers决定要解析的类型
    const _headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    };
    let formBody = null;
    if(_headers['Content-Type'] && _headers['Content-Type'].indexOf('application/x-www-form-urlencoded')>-1) {
      formBody = new URLSearchParams();
      for(let k in data) {//遍历一个对象
        if(typeof(data[k]) === 'object') {
          formBody.append(k, JSON.stringify(data[k]));
        } else {
          formBody.append(k, data[k]);
        }
      }
    }
    return await http._request(
      url,
      {
        method: 'POST',
        headers: _headers,
        body: formBody,
      },
      {},
    )
  }
}
