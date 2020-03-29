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
// import { Provider as ProvideAnt } from '@ant-design/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PlayerView from './player/PlayerView';

import { store } from './redux/stores';
import Player from "./player/Player";
import { screen } from './utils';
import PlayList from "./widget/PlayList";


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


const Stack = createStackNavigator();
function Navigator() {
  return (
    <Stack.Navigator
      headerBackTitle={'返回'}
      headerTintColor={'#333333'}
      showIcon={true}
      headerMode={'screen'}
    >
      {/*<Stack.Screen*/}
        {/*name={'Tab'}*/}
        {/*component={BottomTab}*/}
        {/*options={headerTest}*/}
      {/*/>*/}
      <Stack.Screen name={'PlayerView'} component={PlayerView} options={{headerShown: false}}/>
      {/*<Stack.Screen name={'Player'} component={PlayerScene} options={{headerShown: false}}/>*/}
      {/*<Stack.Screen name={'MvDetail'} component={MvDetail} />*/}
      {/*<Stack.Screen name={'UserDetail'} component={UserDetail} />*/}
      {/*<Stack.Screen name={'DjDetail'} component={DjDetail} />*/}
    </Stack.Navigator>
  );
}
class Main extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
          <Player/>
        </View>
      </Provider>
    );
  }
}

export default Main;
