/***

 @Time    : 2020-03-29 16:04
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : Home.py

 Description:

 Update:

 Todo:

 ***/
import React, { Component } from 'react';
import {
  Container,
  Footer,
} from 'native-base';
import PlayerMini from './player/PlayerMini';
import HomeTabs from './tabs/HomeTabs';
import {createStackNavigator} from "@react-navigation/stack";


import Album from "./album/Album";


const Stack = createStackNavigator();

function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'HomeTabs'} component={HomeTabs} options={{headerShown: false}}/>
      <Stack.Screen name={'Album'} component={Album} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
    }
  }
  componentDidMount(): void {
  }
  render(): * {
    const { navigation } = this.props;

    return(
      <Container>
        <Navigator/>
        <Footer>
          <PlayerMini navigation={navigation}/>
        </Footer>
      </Container>
    );
  }
}
