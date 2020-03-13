/***

 @Time    : 2020-03-13 10:01
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : main.py

 Description:

 Update:

 Todo:

 ***/

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import screen from './utils/screen';

import { store } from './redux/stores';
import Player from "./player/Player";


// import { createStore } from 'redux';
// import reducer from './redux/reducer';

// const store = createStore(reducer);


const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 30,
    backgroundColor: '#ffffff',
    width: screen.width / 3 * 2 ,
    height: screen.width / 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

class Main extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <Text>test something here</Text>
          <Player/>
        </View>
      </Provider>
    );
  }
}

export default Main;
