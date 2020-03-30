/***

 @Time    : 2020-03-30 11:54
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : Search.py

 Description:

 Update:

 Todo:

 ***/

import React, { PureComponent } from 'react';
import {FlatList, Text, View, Image,ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
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


export default class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(): void {
  }

  render(): React.ReactNode {
    return (
      <Container>
        <Header transparent>
          <Text>header here</Text>
        </Header>
        <Content>
          <Text>search page</Text>
        </Content>
      </Container>
    );
  }
}
