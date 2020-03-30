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
import Icon from 'react-native-vector-icons/Ionicons';
import IconMateriallcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from 'react-native-slider';
import BottomSheet from 'reanimated-bottom-sheet';
import { connect } from 'react-redux';

import { screen } from '../utils';
import { playOrPause, playNext, playPrev, changeMode, seek } from './control';
import RepeatMode from '../widget/RepeatMode';
// import PopUp from '../widget/PopUp';
import { modeOptions } from '../redux/stores';
import PlayList from "../widget/PlayList";
import Provider from "react-redux/es/components/Provider";

class PlayerView extends PureComponent {
  state = {
    showLyric: false,
    sliderProgress: 0,
    sliding: false,
    playing: false,
    songListVisible: false,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    const {player} = nextProps;
    if (!prevState.sliding) {
      const updateData = {};
      if (player.sliderProgress !== prevState.sliderProgress) {
        updateData.sliderProgress = player.sliderProgress;
      }
      if (player.playing !== prevState.playing) {
        updateData.playing = player.playing;
      }
      return updateData;
    }
    return null;

  }
  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    if (this.state.playing !== prevState.playing) {
      this.animateControl(this.state.playing);
    }
  }

  componentDidMount(): void {
    const {player} = this.props;
    this.setState({
      playing: player.playing,
    });
    this.animateControl(player.playing);
  }

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
  animateControl = (playing) => {
    this.circling(playing);
    this.topAnimate(playing);
  };

  circling = (start=true) => {
    if (start) {
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 24000,
        easing: Easing.linear
      }).start((o) => {
        if (o.finished)
        {
          this.animatedValue.setValue(0);
          this.circling(true);
        }
      });
    } else {
      this.animatedValue.stopAnimation();
    }
  };
  topAnimate = (playing) => {
    let start = 1;
    let end = 0;
    if (playing) {
      start = 0;
      end = 1;
    }
    this.animatedTop.setValue(start);
    Animated.timing(this.animatedTop, {
      toValue: end,
      duration: 500,
      easing: Easing.linear
    }).start();
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
  popUp = React.createRef();
  render(): React.ReactNode {
    const { player, control, navigation } = this.props;
    const { sliderProgress, songListVisible } = this.state;
    return (
      <View style={styles.container}>
        <Image
          style={{width: screen.width, height: screen.height, position: 'absolute', zIndex: 1, opacity: 0.8}}
          blurRadius={8} source={{uri: 'http://p1.music.126.net/T9nGuH3jv0Rq0iWYeOhvAQ==/30786325589804.jpg' + '?param=200y200'}}
        />
        <View style={{zIndex: 5, flex: 1}}>
          <Header transparent>
            <Left style={{flex:1}}>
              <Button transparent onPress={() => {console.log('goback');return navigation.goBack();}}>
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
              {player.currentTimeReadable}
              </Text>
            </Left>
            <Body>
            <Slider
              maximumTrackTintColor={'#ffffff'}
              minimumTrackTintColor={'orangered'}
              thumbStyle={styles.thumb}
              trackStyle={{height: 2}}
              style={{width: screen.width - 100}}
              value={sliderProgress}
              onSlidingStart={ () => {this.setState({sliding: true})}}
              onSlidingComplete={value => {this.setState({sliding: false});seek(value);}}
            />
            </Body>
            <Right>
              <Text style={{color: 'white'}}>
                {player.durationReadable}
              </Text>
            </Right>
          </View>
          <View style={styles.controlBtn}>
            <RepeatMode size={30} color={'white'}/>
            <Button transparent onPress={playPrev}>
              <Icon name="ios-skip-backward" size={30} color={'white'}/>
            </Button>
            <Button transparent onPress={playOrPause}>
            {player.playing ? (
                <IconMateriallcons name="pause" size={80} color={'white'}/>
            ) : (
                <IconMateriallcons name="play-arrow" size={80} color={'white'}/>
            )}
            </Button>
            <Button transparent onPress={()=> playNext()}>
              <Icon name="ios-skip-forward" size={30} color={'white'}/>
            </Button>
            <Button transparent onPress={() => {this.popUp.current.snapTo(0);this.popUp.current.snapTo(0);}}>
              <IconMateriallcons name="format-list-bulleted" size={30} color={'white'}/>
            </Button>
          </View>
          <BottomSheet
            ref={this.popUp}
            snapPoints={[screen.height, 0]}
            initialSnap={1}
            enabledContentGestureInteraction={false}
            enabledInnerScrolling={true}
            renderContent={() =>
              <View style={{height: '100%'}}>
                <View style={{
                  position: 'absolute',
                  backgroundColor: 'black',
                  opacity: 0.4,
                  height: screen.height,
                  width: screen.width,
                }}/>
                <TouchableOpacity onPress={() => {
                  this.popUp.current.snapTo(1);
                  this.popUp.current.snapTo(1);
                }}>
                  <View style={{
                    height: screen.height - 500,
                  }}/>
                </TouchableOpacity>
                <PlayList/>
              </View>
            }
          />
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
    marginBottom: 10,
  },
});

export default connect( ({player, control}) => ({
  player,
  control,
})
)(PlayerView);
