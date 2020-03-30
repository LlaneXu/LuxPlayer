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
  Spinner,
  H3,
} from 'native-base';

import AlbumCover from '../widget/AlbumCover';
import PublicHeader from '../widget/PublicHeader';
import Loading from '../widget/Loading';


import {album,playlist} from "../api";
import screen from '../utils/screen';
import Icon from "react-native-vector-icons/Ionicons";
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFeather from 'react-native-vector-icons/Feather';

class Album extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id,
      isPlayList: false,
      data: {},
    }
  }

  componentDidMount(): void {
    /*
    playlist data:
    {
      "id": 2719385392,
      "name": "《陈情令》歌曲全收录",
      "description": "“蓝湛，这首曲子叫什么名字啊？” “忘羡”",
      "tracks": [{
        "name": "无羁 钢琴版（Cover：）",
        "id": 1427664555,
        "pst": 0,
        "t": 0,
        "ar": [{
          "id": 32781442,
          "name": "汪琪灿",
          "tns": [],
          "alias": []
            }],
        "al": {
          "id": 86283940,
          "name": "陈情令",
          "picUrl": "http://p1.music.126.net/2kSir3dxy185nIBrJTqspw==/109951164776401876.jpg",
          "tns": [],
          "pic_str": "109951164776401876",
          "pic": 109951164776401876
        }
       }],
      "picUrl": "https://p1.music.126.net/2KznZJlHqhbmpdRAZ18oDA==/109951164742110795.jpg",
      "tags": [
        "影视原声",
        "华语"
      ],
      "playCount": 1234,
      "commentCount": 123123,
      "shareCount": 12412,
    }
     */
    // personalized('netease').then((data) => {
    //   data.forEach((item) => {item.platform = 'netease'});
    //   this.setState({data});
    // })
    const {route: {params: {id, isPlayList}} } = this.props;
    this.setState({id,isPlayList});
    if (isPlayList) {
      playlist("netease", id).then((data) => {
        console.log(data);
        this.setState({loading: false, data})
      })
    }
  }

  render(): React.ReactNode {
    const {id, loading, isPlayList, data} = this.state;
    const { tracks } = data;
    const {navigation} = this.props;
    return (
      <Container>
        <PublicHeader title={isPlayList ? '歌单' : '专辑'}/>
        <Loading loading={loading}>
          <Content>
            <View>
              <Image
                style={{width: screen.width, height: screen.height, position: 'absolute', zIndex: 1, opacity: 0.6}}
                blurRadius={8} source={{uri: data.picUrl}}
              />
              <View
                style={{
                  flex: 1,
                  zIndex: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <AlbumCover data={data} size={150}/>
                <View style={{flex: 1, margin: 20}}>
                  <H3>{data.name}</H3>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text numberOfLines={3} style={{marginTop: 20}}>{data.description}</Text>
                    <Icon style={{marginLeft: 10}} name={'ios-arrow-forward'}/>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-around'}}>
                <View style={{alignItems: 'center'}}>
                  <IconFeather size={25} name={'message-circle'}/>
                  <Text>{data.commentCount}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <IconFeather size={25} name={'share'}/>
                  <Text>{data.shareCount}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <IconFeather size={25} name={'download'}/>
                  <Text>下载</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <IconFeather size={25} name={'check-circle'}/>
                  <Text>多选</Text>
                </View>
              </View>
            </View>
          </Content>
        </Loading>
      </Container>
    );
  }
}

export default Album;
