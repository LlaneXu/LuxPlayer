/***

 @Time    : 2020-03-13 17:49
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : PlayerView.py

 Description:

 Update:

 Todo:

 ***/

import React, { PureComponent } from 'react';
import {
  View, StyleSheet, Image, ImageBackground, TouchableOpacity, Animated, Easing, Text, ScrollView
} from 'react-native';
import {
  Header,
  Left,
  Right,
  Button,
  Body,
  Title,
  // Icon,
  Footer,
} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from 'react-native-slider';
import { connect } from 'react-redux';
import { screen } from '../utils'

class PlayerView extends PureComponent {
  state = {
    showLyric: false,
  };
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
    this.animatedTop = new Animated.Value(0);
  }
  showLyric = () => {
    this.setState({
      showLyric: !this.state.showLyric
    })
  };

  cdView = () => {
    const interpolatedAnimation = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const topAnimation = this.animatedTop.interpolate({
      inputRange: [0, 1],
      outputRange: ['-35deg', '-5deg']
    });
    const { showLyrics } = this.state;
    return (
      <View style={{position: 'absolute', opacity: showLyrics ? 0.1 : 1}}>
        <View
          style={{position: 'absolute', top: -38, left: 34, width: screen.width, alignItems: 'center', zIndex: 2}}>
          <Animated.Image
            source={require('../static/img/needle-ip6.png')}
            style={[{width: 100, height: 140}, {
              transform: [
                {translateX: -35},
                {translateY: -70},
                {rotateZ: topAnimation},
                {translateX: 35},
                {translateY: 70},
              ]
            }]}
          />
        </View>
        <ImageBackground source={require('../static/img/disc-ip6.png')} style={{
          width: screen.width - 40,
          height: screen.width - 40,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Animated.Image
            source={{uri: 'http://p1.music.126.net/T9nGuH3jv0Rq0iWYeOhvAQ==/30786325589804.jpg' + '?param=200y200'}}
            style={[{
              width: screen.width - 152,
              height: screen.width - 152,
              borderRadius: (screen.width - 152) / 2
            }, {
              transform: [
                {rotate: interpolatedAnimation},
              ]
            }]}
          />
        </ImageBackground>
      </View>
    );
  };
  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Image
          style={{width: screen.width, height: screen.height, position: 'absolute', zIndex: 1, opacity: 0.8}}
          blurRadius={8} source={{uri: 'http://p1.music.126.net/T9nGuH3jv0Rq0iWYeOhvAQ==/30786325589804.jpg' + '?param=200y200'}}
        />
        <View style={{zIndex: 5, flex: 1}}>
          <Header transparent>
            <Left style={{flex:1}}>
              <Button transparent>
                <Icon name={'ios-arrow-back'} size={25} color={'white'}/>
              </Button>
            </Left>
            <Body style={{flex:1}}>
              <Title style={{alignSelf: 'center'}}>歌名 作者</Title>
            </Body>
            <Right style={{flex:1}}>
              <Button transparent>
                <Icon name={'ios-redo'} size={25} color={'white'}/>
              </Button>
            </Right>
          </Header>
          {/*
          <View style={styles.headerContainer}>
            <TouchableOpacity
              // onPress={this.goBack}
            >
              <Icon name="ios-arrow-back" size={25} color={color.white}/>
            </TouchableOpacity>
            <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <Normal color={color.white}>{params.name}</Normal>
              <Tip color={color.white} style={{fontSize: 9}}>{params.artists}</Tip>
            </View>
            <TouchableOpacity onPress={this.test}>
              <Icon name="ios-redo" size={25} color={color.white}/>
            </TouchableOpacity>
          </View>
          */}
          <TouchableOpacity
            style={styles.cdContainer}
            onPress={this.showLyric}
          >
            {
              this.cdView()
            }
            {/*{lyricsView}*/}
          </TouchableOpacity>
          <View style={styles.socialBtn}>
            <Button transparent>
              <Icon name="ios-heart-empty" size={25} color={'white'}/>
            </Button>
            <Button transparent>
              <Icon name="ios-cloud-download" size={25} color={'white'}/>
            </Button>
            <Button transparent>
              <Icon name="ios-chatbubbles" size={25} color={'white'}/>
            </Button>
            <Button transparent>
              <Icon name="md-more" size={25} color={'white'}/>
            </Button>
          </View>
          <View style={styles.sliderBtn}>
            <Left>
              <Text style={{color: 'white'}}>
              03:11
              </Text>
            </Left>
            <Body>
            <Slider
              maximumTrackTintColor={'#ffffff'}
              minimumTrackTintColor={'orangered'}
              thumbStyle={styles.thumb}
              trackStyle={{height: 2}}
              style={{width: screen.width - 100}}
              // value={currentPlay.sliderProgress}
              value={0.3}
              // onValueChange={value => this.sliderChange(value)}
            />
            </Body>
            <Right>
              <Text style={{color: 'white'}}>
              05:22
              </Text>
            </Right>
          </View>
          <View style={styles.controlBtn}>
            <Button transparent>
              <Icon name="ios-repeat" size={30} color={'white'}/>
            </Button>
            <Button transparent>
              <Icon name="ios-skip-backward" size={30} color={'white'}/>
            </Button>
            <Button transparent>
              <Icon name="ios-pause" size={60} color={'white'}/>
            </Button>
            <Button transparent>
              <Icon name="ios-play" size={60} color={'white'}/>
            </Button>
            <Button transparent>
              <Icon name="ios-skip-forward" size={30} color={'white'}/>
            </Button>
            <Button transparent>
              <Icon name="ios-list" size={30} color={'white'}/>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  headerContainer: {
    height: 50,
    width: screen.width,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: screen.onePixel,
    borderColor: 'rgba(245, 245, 245, 0.21)'
  },
  cdContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialBtn: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sliderBtn: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: 'orangered',
    borderColor: 'white',
    borderWidth: 7,
    borderRadius: 10,
  },
  controlBtn: {
    height: 50,
    width: screen.width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

export default connect( ({player}) => ({
  player,
})
)(PlayerView);
