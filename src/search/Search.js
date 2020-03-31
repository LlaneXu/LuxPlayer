/***

 @Time    : 2020-03-30 11:54
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : Example.py

 Description:

 Update:

 Todo:

 ***/

import React, {PureComponent} from 'react';
import {
  FlatList,
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {
  Body,
  Button,
  Header, Left, Right, Title,
  Container,
  Content,
  Footer,
  Tabs,
  Card,
  CardItem,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'



export default class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount(): void {
  }

  render(): React.ReactNode {
    return (
      <View>
      <Text>search page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

})
