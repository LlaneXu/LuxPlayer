/***

 @Time    : 2020-03-31 12:12
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : AlbumSongs.py

 Description:

 Update:

 Todo:

 ***/
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  Button,
  Container,
} from 'native-base';
import Loading from '../widget/Loading';


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

class SongList extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    style: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(): void {
    /*
    data:
    [{
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
    }]
    */
  }
  renderItem = ({item, index, separators}) => {
    const artist = item.ar.map((one) => one.name).join('&');
    return (
      <View style={{flex:1, margin: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flex: 0.8, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textFade}>{index+1}.</Text>
          <View>
            <Text numberOfLines={1} style={styles.text}>{item.name}</Text>
            <Text numberOfLines={1} style={styles.textFade}>{artist}-{item.al.name}</Text>
          </View>
        </View>
        <View style={{marginRight: 10}}>
          <Button transparent>
            <Icon name={'md-more'} size={25} color={'grey'}/>
          </Button>
        </View>
      </View>
    );
  };

  render(): React.ReactNode {
    const {loading=false, data, style} = this.props;
    return (
      <Loading loading={loading}>
        <View style={{
          margin: 10,
          marginBottom: 0,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          ...style,
        }}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => {
              return item.id.toString();
            }}
            renderItem={this.renderItem}
            // ListHeaderComponent={header}
            // listFooterComponent={footer}
          />
        </View>
      </Loading>
    );
  }
}

export default SongList;
