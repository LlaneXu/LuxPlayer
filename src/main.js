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
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './Home';
import PlayerView from './player/PlayerView';
import Search from './search/Search';

import { store } from './redux/stores';
import Player from "./player/Player";
import { screen } from './utils';


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

const Drawer = createDrawerNavigator();

function LeftDrawer() {
  return (
  <Drawer.Navigator>
    <Drawer.Screen name={'Home'} component={Home} options={{headerShown: false}}/>
    <Drawer.Screen name={'Setting'} component={() => <Text>Setting screen</Text>} />
    <Drawer.Screen name={'Setting2'} component={() => <Text>Setting2 screen</Text>} />
  </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();
function Navigator() {
  return (
    <Stack.Navigator
      headerBackTitle={'返回'}
      headerTintColor={'#333333'}
      showIcon={true}
      headerMode={'screen'}
    >
      <Stack.Screen name={'Drawer'} component={LeftDrawer} options={{headerShown: false}}/>
      <Stack.Screen name={'PlayerView'} component={PlayerView} options={{headerShown: false}}/>
      <Stack.Screen name={'Search'} component={Search} options={{headerShown: false}}/>
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
