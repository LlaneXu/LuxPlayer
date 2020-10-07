/***

 @Time    : 2020-04-01 22:33
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : Progress.py

 Description:

 Update:

 Todo:

 ***/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {seek} from "../player/control";
import Slider from "@react-native-community/slider";
import screen from "../utils/screen";

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { style={}, slider: {progress}} = this.props;
    return (
      <Slider
        maximumTrackTintColor={'#ffffff'}
        minimumTrackTintColor={'orangered'}
        thumbTintColor={'white'}
        // thumbStyle={styles.thumb}
        // trackStyle={{height: 2}}
        style={{width: screen.width - 100, ...style}}
        value={progress}
        onSlidingStart={ () => {this.setState({sliding: true})}}
        onSlidingComplete={value => {this.setState({sliding: false});seek(value);}}
      />
    )
  }
}
export default connect( ({slider}) => ({
  slider,
  })
)(Progress);
