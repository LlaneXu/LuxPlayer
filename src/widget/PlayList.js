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
import {FlatList, Text, View} from 'react-native';
import {
  Body,
  Button, Left, Right,
} from "native-base";
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import RepeatMode from "./RepeatMode";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import BottomSheet from "reanimated-bottom-sheet";

class PlayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { control } = this.props;
    return (
      <Text>something</Text>
      // <Carousel
      //   data={[
      // control.historyList,
      // control.lastList,
      // control.playList
      //   ]}
      //   renderItem={({item, index}) => {
      //     console.log(item);
      //     return (
      //       <Text>something</Text>
      //     );
      //   }}
      // />
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
