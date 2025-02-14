/***

 @Time    : 2020-03-30 10:22
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : Svg.py

 Description:

 Update:

 Todo:

 ***/

import React, { Component } from 'react';
import {
  ViewStyle,
} from 'react-native'
import SvgUri from '../widget/react-native-svg-uri';
import svgs from '../static/svgs';


export default class Svg extends Component<SvgProperties, void>{
  render() {
    const {
      icon,
      color,
      size,
      style,
    } = this.props;
    let svgXmlData = svgs[this.props.icon];

    if (!svgXmlData) {
      let err_msg = `没有"${this.props.icon}"这个icon，请下载最新的icomoo并 npm run build-js`;
      throw new Error(err_msg);
    }
    return (
      <SvgUri
        width={size}
        height={size}
        svgXmlData={svgXmlData}
        fill={color}
        style={style}
      />
    )
  }
}
