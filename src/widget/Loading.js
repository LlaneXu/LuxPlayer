/***

 @Time    : 2020-03-30 14:40
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : Loading.py

 Description:

 Update:

 Todo:

 ***/

import React, { Component } from 'react';
import {
  Spinner,
} from 'native-base';


export default function Loading(props){
  const {loading} = props;
  if (loading) {
    return <Spinner />
  } else {
    return props.children;
  }
}
