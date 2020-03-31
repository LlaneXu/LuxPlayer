/***

 @Time    : 2020-03-30 21:55
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : Mine.py

 Description:

 Update:

 Todo:

 ***/


import React, { PureComponent } from 'react';
import {FlatList, Text, View, Image,ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';

class Mine extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }
  componentDidMount(): void {
  }

  render(): React.ReactNode {
    const {data} = this.state;
    const { navigation } = this.props;
    return (
      <View>
        <Text>my page</Text>
      </View>
    );
  }
}

export default Mine;
