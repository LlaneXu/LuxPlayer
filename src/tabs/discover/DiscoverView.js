/***

 @Time    : 2020-03-29 20:25
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : DiscoverView.py

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

import AlbumCover from '../../widget/AlbumCover';


import {personalized} from "../../api";
import screen from '../../utils/screen';

class DiscoverView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
    personalized('netease').then((data) => {
      data.forEach((item) => {item.platform = 'netease'});
      this.setState({data});
    })
  }

  render(): React.ReactNode {
    const {data} = this.state;
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex:1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
        {data.map((item) => {
          return (
            <View key={item.id} style={{margin: 5, width: 120, alignItems:'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Album', {meta: item, isPlayList: true})}>
                <AlbumCover data={item} size={120}/>
                <Text numberOfLines={2} style={{fontsize:15}}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}

      </View>
    );
  }
}

export default DiscoverView;
