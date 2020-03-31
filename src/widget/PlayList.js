/***

 @Time    : 2020-03-26 23:12
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : PlayList.py

 Description:

 Update:

 Todo:

 ***/
import React, { Component } from 'react';
import {FlatList, Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  H3,
  Card,
  CardItem,
  Body,
  Button, Left, Right,
} from "native-base";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import RepeatMode from "./RepeatMode";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheet from "reanimated-bottom-sheet";
import screen from '../utils/screen';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white'
  },
  margin: {
    margin: 10,
  },
  headerContainer: {
    padding: 10,
    backgroundColor: "white",
    borderColor: 'grey',
    borderBottomWidth: 1,
    // borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  headerTitle: {
    marginTop: 10,
    marginLeft: 10,
    // height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    // marginTop: 20,
    // marginLeft: 10,
    // // height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    paddingLeft:10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerRight: {
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerDelete: {
    borderLeftWidth: 1,
    borderColor: 'grey',
    paddingLeft: 10
  },
  text: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 18,
    color: 'black',
  },
  textFade: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 15,
    color: 'grey',
  },
  icon: {},
});

class PlayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderActiveSlide: 2,
    }
  }
  renderPlayListHeader = (playListObj,index) => {
    const {control} = this.props;
    const {name, data} = playListObj;
    const titleMap = ['历史播放','上次播放','当前播放'];
    console.log(playListObj)
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTitle}>
        <H3>{titleMap[index]}</H3>
          <Text style={styles.textFade}>({data.length})</Text>
        </View>
        {index !==2 ? (
          <Text style={[styles.margin,styles.textFade]}>{name}</Text>
        ) : (
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <RepeatMode size={20} color={'grey'} textOn textStyle={styles.text}/>
            </View>
            <View/>
            <View style={styles.headerRight}>
              <View style={styles.headerRight}>
                <IconFontAwesome name="plus-square-o" size={20} color={'grey'}/>
                <Text style={styles.text}>收藏全部</Text>
              </View>
              <View style={styles.headerDelete}>
                <IconFontAwesome name="trash-o" size={20} color={'grey'}/>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };
  renderLine = (data, index, selected) => {
    if(data) {
      console.log(data.artist);
      const artist = data.artist.map((item) => item.name).join('&');
      return (
        <View style={{flex:1, margin: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 0.8, flexDirection: 'row', alignItems: 'center'}}>
            <Text numberOfLines={1}>
              <Text style={styles.textFade}>{index+1}.</Text>
              <Text style={styles.text}>{data.name}</Text>
              <Text style={styles.textFade}>-{artist}</Text>
            </Text>
          </View>
          <View style={{marginRight: 10}}>
            <Button transparent>
              <Icon name={'md-close'} size={25} color={'grey'}/>
            </Button>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  renderPlayList = ({item, index}) => {
    if (item) {
      return (
        <View style={{height: '100%'}}>
          {this.renderPlayListHeader(item,index)}
          <FlatList
            style={{backgroundColor:'white',paddingLeft: 10}}
            data={item.data}
            keyExtractor={(item, index) => {
              return item.id.toString();
            }}
            // initialScrollIndex={7}
            // ItemSeparatorComponent={() => <View
            //   style={{height: 1, width: '96%', backgroundColor: '#CED0CE', marginLeft: '2%'}}/>}
            renderItem={({item, index, separators}) => this.renderLine(item, index)}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
    const { control } = this.props;
    const {sliderActiveSlide} = this.state;
    const listData = [];
    if (control.historyListObj && control.historyListObj.id){
      listData.push(control.historyListObj);
    }
    if (control.lastListObj && control.lastListObj.id){
      listData.push(control.lastListObj);
    }
    if (control.playListObj && control.playListObj.id){
      listData.push(control.playListObj);
    }
    return (
      <View>
        {/*{this.renderItem({item:control.playList,index:2})}*/}
        <Pagination
          dotsLength={3}
          activeDotIndex={sliderActiveSlide}
          containerStyle={{
            paddingVertical: 8
          }}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 8
          }}
          inactiveDotColor={'#1a1917'}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          // carouselRef={this._slider1Ref}
          // tappableDots={!!this._slider1Ref}
        />
      <Carousel
        layout={'default'}
        data={listData}
        sliderWidth={screen.width}
        itemWidth={screen.width-40}
        // hasParallaxImages={true}
        firstItem={2}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={0.7}
        // slideStyle={{margin: 10}}
        // autoplay={true}
        // autoplayDelay={500}
        // autoplayInterval={3000}
        // loop={true}
        // enableSnap={true}
        containerCustomStyle={{
          // marginLeft:10,
          marginTop: 15,
          overflow: 'visible' // for custom animations
        }}
        // contentContainerCustomStyle={{
        //   paddingLeft: 10,
        // //   paddingVertical: 10 // for custom animation
        // }}
        onSnapToItem={(index) => this.setState({ sliderActiveSlide: index }) }
        renderItem={this.renderPlayList}
      />
      </View>
    );
  }
}
    /*
    return (
      <BottomSheet
        ref={this.popUp}
        snapPoints={[400,0]}
        initialSnap={0}
        renderContent={() =>
          <View style={{backgroundColor:'#ffffff', height: 370}}>
            <FlatList
              data={control.playList}
              keyExtractor={(item, index) => {
                return item.id.toString();
              }}
              ItemSeparatorComponent={() => <View
                style={{height: 1, width: '96%', backgroundColor: '#CED0CE', marginLeft: '2%'}}/>}
              renderItem={({item, index, separators}) => {
                console.log(item)
                return (
                  <Text>{item.name}</Text>
                )
              }}
            />
          </View>
        }
        renderHeader={() =>
          <View style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: "white",
            borderColor: 'grey',
            borderBottomWidth: 1,
            // borderWidth: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          }}>
            <Left style={{paddingLeft:10, flexDirection: 'row', alignItems: 'center',}}>
              <RepeatMode size={20} color={'grey'} textOn textStyle={{fontSize:18, color:'black'}}/>
              <Text style={{fontSize:18}}>({control.playList.length})</Text>
            </Left>
            <Body/>
            <Right style={{flexDirection: 'row', alignItems: 'center', paddingRight: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                <IconFontAwesome name="plus-square-o" size={20} color={'grey'}/>
                <Text style={{fontSize:18, marginLeft: 5,}}>收藏全部</Text>
              </View>
              <View style={{borderLeftWidth: 1, borderColor: 'grey', paddingLeft: 10}}>
                <IconFontAwesome name="trash-o" size={20} color={'grey'}/>
              </View>
            </Right>
          </View>
        }
      />
    )
    */
export default connect( ({control}) => ({
    control,
  })
)(PlayList);
