/***

 @Time    : 2020-03-30 00:05
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : Cover.py

 Description:

 Update:

 Todo:

 ***/
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import {
  Left,
  Body,
  Right,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Svg from "./Svg";

export default class AlbumCover extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { data, size=150 } = this.props;
    let playCount = data.playCount;
    let unit = '';
    if (playCount>10000) {
      playCount /= 10000;
      unit = '万';
    }
    if (playCount>10000) {
      playCount /= 10000;
      unit = '亿';
    }
    playCount = playCount.toFixed(0) + unit;
    return (
      <View style={{margin: 10, width: size, height: size}}>
        <ImageBackground
          source={{uri: data.picUrl}}
          style={{
            flex:1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent:'space-between',
            resizeMode: 'cover'
          }}>
          <View>
            <Svg icon={'netease'} size={20} style={{backgroundColor: 'white', borderRadius: 12}}/>
          </View>
          <View/>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <Icon name={'ios-play'} style={{color: 'white'}}/>
            <Text style={{color: 'white', fontSize:15}}>{playCount}</Text>
          </View>
        </ImageBackground>
      </View>
    )
  }
}
