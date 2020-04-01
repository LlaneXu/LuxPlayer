/***

 @Time    : 2020-03-29 16:20
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : PlayerMini.py

 Description:

 Update:

 Todo:

 ***/
import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
  Text,
  Modal,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Header,
  Left,
  Right,
  Button,
  Body,
  Title,
} from "native-base";
import {connect} from "react-redux";
import { screen } from '../utils';


class PlayerMini extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render(): React.ReactNode {
    const { navigation } = this.props;
    return (
      <View style={{marginBottom:0, position: 'absolute', height: 50, widget: screen.width}}>
        <TouchableOpacity onPress={() => {
          console.log('go PlayerView');
          return navigation.navigate('PlayerView');
        }}>
          <Text> 小型播放器位置</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export default connect( ({player, control}) => ({
    player,
    control,
  })
)(PlayerMini);
