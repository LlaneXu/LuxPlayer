/***

 @Time    : 2020-03-30 11:10
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : Album.py

 Description:

 Update:

 Todo:

 ***/
import React, { PureComponent } from 'react';
import {FlatList, Text, View, Image,ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Body,
  Button,
  Left, Right, Title,
  Container,
  Content,
  Footer,
  Tabs,
  Card,
  CardItem,
} from 'native-base';

import AlbumCover from '../widget/AlbumCover';
import PublicHeader from '../widget/PublicHeader';


import {personalized} from "../api";
import screen from '../utils/screen';
import Icon from "react-native-vector-icons/Ionicons";

class Album extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      meta: {},
    }
  }

  componentDidMount(): void {
    /*
    {
      "id": 2738703582,
      "type": 0,
      "name": "异域风情，覆盖着特立独行调味剂的香水味",
      "copywriter": "编辑推荐：一切都那么自由，纯粹",
      "picUrl": "https://p2.music.126.net/klRKF7klpxopggqPXOWNDA==/109951164741909270.jpg",
      "canDislike": false,
      "trackNumberUpdateTime": 1585294684640,
      "playCount": 332386.0,
      "trackCount": 65,
      "highQuality": false,
      "alg": "featured"
    },
     */
    // personalized('netease').then((data) => {
    //   data.forEach((item) => {item.platform = 'netease'});
    //   this.setState({data});
    // })
  }

  render(): React.ReactNode {
    const {data} = this.state;
    const {navigation, route: {params: {meta, isPlayList}} } = this.props;
    console.log(this.props);
    return (
      <Container>
        <PublicHeader title={isPlayList?'歌单':'专辑'}/>
      <Content>
      <View
        style={{
          flex:1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
        <AlbumCover data={meta} size={120}/>
        {/*{data.map((item) => {*/}
          {/*return (*/}
            {/*<View key={item.id} style={{margin: 5, width: 120, alignItems:'center'}}>*/}
              {/**/}
              {/*<Text numberOfLines={2} style={{fontsize:15}}>{item.name}</Text>*/}
            {/*</View>*/}
          {/*);*/}
        {/*})}*/}

      </View>
      </Content>
      </Container>
    );
  }
}

export default Album;
