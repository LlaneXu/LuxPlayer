/***

 @Time    : 2020-03-30 11:10
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : DetailView.py

 Description:

 Update:

 Todo:

 ***/
import React, { PureComponent } from 'react';
import {
  Dimensions,
  ListView,
  FlatList, Text, View, Image, ImageBackground, StyleSheet, TouchableOpacity, SafeAreaView
} from 'react-native';
import {
  Button,
  Container,
} from 'native-base';

import PublicHeader from '../widget/PublicHeader';
import Loading from '../widget/Loading';

import AlbumDescription from './AlbumDescription';
import SongList from './SongList';

import {playlist} from "../api";
import screen from '../utils/screen';
import Icon from "react-native-vector-icons/Ionicons";



const styles = StyleSheet.create({
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
});

class DetailView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id: null,
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
    console.log(this.props);
    this.setState({id,isPlayList});
    if (isPlayList) {
      playlist("netease", id).then((data) => {
        console.log(data);
        this.setState({loading: false, data})
      })
    }
  }

  render(): React.ReactNode {
    const { loading, isPlayList, data} = this.state;
    const { tracks=[], name='', id=0 } = data;
    const {navigation} = this.props;
    return (
      <Container>
        <Loading loading={loading}>
          <Image
            style={{width: screen.width, height: screen.height, position: 'absolute', zIndex: 0, opacity: 0.6}}
            blurRadius={8} source={{uri: data.picUrl}}
          />
          <PublicHeader title={isPlayList ? '歌单' : '专辑'}/>
          <View style={{flex:5}}>
          <AlbumDescription style={{flex:2}} data={data}/>
          <SongList style={{flex:3}} data={tracks} id={id} name={name}/>
          </View>
        </Loading>
      </Container>
    );
  }
}

export default DetailView;
