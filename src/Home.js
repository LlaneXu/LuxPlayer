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
import {FlatList, Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Body,
  Button,
  Header, Left, Right, Title,
  Container,
  Content,
  Footer,
  Tabs,
} from 'native-base';
import Icon from "react-native-vector-icons/Ionicons";
import Animated from 'react-native-reanimated';
import screen from './utils/screen';
import PlayerMini from './player/PlayerMini';
import Carousel from "react-native-snap-carousel";
import {personalized} from './api';


const styles = StyleSheet.create({
  textActive: {
    fontSize: 18,
    color: 'black',
  },
  textInactive: {
    fontSize: 15,
    color: 'grey',
  },
});

export default class Home extends Component {
  tabMap = ['我的','发现'];
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
    }
  }
  componentDidMount(): void {
    console.log('send request')
    personalized().then((data) => {
      console.log(data);
    })
  }

  renderItem = ({item, index}) => {
    return (
      <View style={{width: '100%', height: '100%', backgroundColor:'grey'}}>
      <Text>{item}-{index}</Text>
      </View>
    );
  };
  render(): * {
    const { navigation } = this.props;
    const {activeTab} = this.state;

    return(
      <Container>
        <Header transparent>
          <Left style={{flex: 1}}>
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Icon name={'ios-menu'} size={25} color={'grey'}/>
            </Button>
          </Left>
          <Body style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          {this.tabMap.map((item,index) => {
            return (
              <TouchableOpacity key={index} style={{marginLeft:10, marginRight: 10}} onPress={()=>{this._carousel.snapToItem(index)}}>
                <Text style={activeTab===index? styles.textActive: styles.textInactive}>{item}</Text>
              </TouchableOpacity>
            );
          })}
          </Body>
          <Right style={{flex: 1}}>
            <Button transparent>
              <Icon name={'ios-search'} size={25} color={'grey'}/>
            </Button>
          </Right>
        </Header>
        <Content style={{backgroundColor: 'blue'}}>
          <Carousel
            ref={(ref) => this._carousel = ref}
            layout={'default'}
            data={this.tabMap}
            sliderWidth={screen.width}
            itemWidth={screen.width}
            // hasParallaxImages={true}
            firstItem={1}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            // slideStyle={{margin: 10}}
            // autoplay={true}
            // autoplayDelay={500}
            // autoplayInterval={3000}
            // loop={true}
            // enableSnap={true}
            containerCustomStyle={{
              // marginLeft:10,
              // marginTop: 15,
              overflow: 'visible' // for custom animations
            }}
            // contentContainerCustomStyle={{
            //   paddingLeft: 10,
            // //   paddingVertical: 10 // for custom animation
            // }}
            onSnapToItem={(index) => this.setState({ activeTab: index }) }
            renderItem={this.renderItem}
          />
          {/*<Tab.Navigator*/}
            {/*// style={{zIndex: 10}}*/}
            {/*tabBarOptions={{*/}
              {/*style: {*/}
                {/*marginLeft: '10%',*/}
                {/*// height: 500,*/}
                {/*width: '80%',*/}
                {/*// position: 'absolute',*/}
                {/*border: 0,*/}
                {/*backgroundColor: 'white',*/}
              {/*}*/}
            {/*}}*/}
          {/*>*/}
            {/*<Tab.Screen name={'Mine'} component={() => <Text>Mine</Text>}/>*/}
            {/*<Tab.Screen name={'Discover'} component={() => <Text>Discover</Text>}/>*/}
          {/*</Tab.Navigator>*/}
        </Content>
        <Footer>
          <PlayerMini navigation={navigation}/>
        </Footer>
      </Container>
    );
  }
}
