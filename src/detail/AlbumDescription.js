/***

 @Time    : 2020-03-31 12:15
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : AlbumDescription.py

 Description:

 Update:

 Todo:

 ***/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {
  Container,
  Content,
  H3,
} from 'native-base';

import AlbumCover from '../widget/AlbumCover';
import Loading from '../widget/Loading';


import Icon from "react-native-vector-icons/Ionicons";
import IconFeather from 'react-native-vector-icons/Feather';



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

class AlbumDescription extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object.isRequired,
    style: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
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
  }

  render(): React.ReactNode {
    const {loading=false, data={}, style} = this.props;
    return (
      <Loading loading={loading}>
        <View style={style}>
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
              <Text numberOfLines={2} style={{marginTop: 20}}>{data.description}</Text>
              <Icon style={{marginLeft: 10}} name={'ios-arrow-forward'}/>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
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
      </Loading>
    );
  }
}

export default AlbumDescription;
