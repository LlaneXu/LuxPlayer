/***

 @Time    : 2020-03-30 11:56
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : Header.py

 Description:

 Update:

 Todo:

 ***/

import React, { Component } from 'react';
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  H3,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function PublicHeader(props) {
  const {title} = props;
  const navigation = useNavigation();
  return (
    <Header transparent>
      <Left style={{flex: 1}}>
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name={'ios-arrow-back'} size={25} color={'grey'}/>
        </Button>
      </Left>
      <Body transparent style={{alignItems: 'center'}}>
      <H3>{title}</H3>
      </Body>
      <Right style={{flex: 1}}>
        <Button transparent onPress={()=> navigation.navigate('Example')}>
          <Icon name={'ios-search'} size={25} color={'grey'}/>
        </Button>
      </Right>
    </Header>
  )
}
