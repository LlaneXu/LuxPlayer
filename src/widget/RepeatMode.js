/***

 @Time    : 2020-03-26 20:15
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : RepeatMode.py

 Description:

 Update:

 Todo:

 ***/
import React, { Component } from 'react';
import {Text, View} from 'react-native';
import {
  Button,
} from "native-base";
import { connect } from 'react-redux';
import IconMateriallcons from 'react-native-vector-icons/MaterialIcons';
import {changeMode} from "../player/control";
import {modeOptions} from "../redux/stores";

class RepeatMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { control, size=30, color='grey', textOn=false, textStyle={marginLeft: 2, fontSize:20, color:'black'}} = this.props;
    return (
      <View style={{flexDirection: 'row',
        alignItems: 'center',}}>
        <Button transparent onPress={changeMode}>
          {control.mode === 'cycle' && <IconMateriallcons name="repeat" size={size} color={color}/>}
          {control.mode === 'random' && <IconMateriallcons name="shuffle" size={size} color={color}/>}
          {control.mode === 'cycleOne' && <IconMateriallcons name="repeat-one" size={size} color={color}/>}
        </Button>
        {textOn && <Text style={textStyle}>{modeOptions[control.mode]}</Text>}
      </View>
    )
  }
}

export default connect( ({control}) => ({
    control,
  })
)(RepeatMode);
