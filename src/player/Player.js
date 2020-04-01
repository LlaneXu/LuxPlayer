/***

 @Time    : 2020-03-13 10:41
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : Player.py

 Description:

 Update:

 Todo:

 ***/

import React, { PureComponent } from 'react';
import Video from 'react-native-video';
import {
  View,
  TextInput,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import { PLAYER } from '../redux/actions';
import {secondToString} from '../utils/tools';
import {updateRef, playOrPause, playSong, seek, playNext, onEndProcess, onErrorProcess} from './control'


class Player extends PureComponent {
  state = {
    url: null,  // used to define whether to start a new audio
    // seekPos: null, // used to response a seek action
  };
  /* big hole here, better not to use. */
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps, prevState);
    if (nextProps.player.url !== prevState.url) {
      const ret = {
        url: nextProps.player.url,
      };

      console.log('getDerivedStateFromProps: ', ret);
      return ret
    } else {
      return null;
    }
  }
  //
  // testurl=[
  //   'http://biliblue.com/static/music/%E8%96%9B%E4%B9%8B%E8%B0%A6/%E7%BB%85%E5%A3%AB/%E8%96%9B%E4%B9%8B%E8%B0%A6%20-%20%E6%BC%94%E5%91%98.m4a',
  //   'http://music.163.com/song/media/outer/url?id=1425818683.mp3',
  // ];
  // i=0;
  // getUrl(id, platform) {
  //   const url = this.testurl[this.i];
  //   this.i++;
  //   if (this.i>=this.testurl.length) this.i=0
  //   return url;
  // }
  onLoadStart = (data) => {
    console.log('onLoadStart',data)
  };
  onLoad = (data) => {
    /* data structure:
    currentPosition	number	Time in seconds where the media will start
    duration	      number	Length of the media in seconds
    naturalSize	    object	Properties:
                              * width - Width in pixels that the video was encoded at
                              * height - Height in pixels that the video was encoded at
                              * orientation - "portrait" or "landscape"
    audioTracks	    array	  An array of audio track info objects with the following properties:
                              * index - Index number
                              * title - Description of the track
                              * language - 2 letter ISO 639-1 or 3 letter ISO639-2 language code
                              * type - Mime type of track
    textTracks	    array	  An array of text track info objects with the following properties:
                              * index - Index number
                              * title - Description of the track
                              * language - 2 letter ISO 639-1 or 3 letter ISO 639-2 language code
                              * type - Mime type of track
    videoTracks	    array	  An array of video track info objects with the following properties:
                              * trackId - ID for the track
                              * bitrate - Bit rate in bits per second
                              * codecs - Comma separated list of codecs
                              * height - Height of the video
                              * width - Width of the video
    */
    console.log('onload', data);
    this.props.dispatch({
      type: PLAYER.STATUS,
      data: {
        ...data,
        durationReadable: secondToString(data.duration),
        playing: true,
      }
    });
  };
  onProgress = (data) => {
    /*
    currentTime	      number	Current position in seconds
    playableDuration	number	Position to where the media can be played to using just the buffer in seconds
    seekableDuration	number	Position to where the media can be seeked to in seconds. Typically, the total length of the media
    */
    // console.log('onProgress', data);
    const { player: {duration} } = this.props;
    this.props.dispatch({
      type: PLAYER.STATUS,
      data: {
        ...data,
        sliderProgress: data.currentTime/duration,
        currentTimeReadable: secondToString(data.currentTime),
      },
    });
    this.setState({playing:true})
  };
  onEnd = () => {
    /*
    isExternalPlaybackActive	boolean	Boolean indicating whether external playback mode is active
     */
    console.log('onEnd')
    onEndProcess();
  };
  onError = (data) => {
    console.log('onError', data);
    onErrorProcess();
  };
  onBuffer = (data) => {
    console.log('onBuffer:', data);
  };
  onTimedMetadata = () => {
    /*
    Callback function that is called when timed metadata becomes available

    Property	Type	Description
    metadata	array	Array of metadata objects
     */
  };
  onSeek = () => {
    const {seekPos} = this.state;
    const {player={}} = this.props;
    if (seekPos !== player.seekPos) {
      this.state.seekPos = player.seekPos;
      if (this.ref) {
        this.ref.seek(player.seekPos);
      }
    }
  };
  render() {
    const { url } = this.state;
    const {player} = this.props;
    // this.onSeek();
    console.log('url:',url)
    console.log('player.playing:',player.playing)
    // console.log('playering',player.playing)
    return (
      <View>
        {/*
        <Button title={'update'} onPress={() => {
          playSong(this.getUrl());
          // this.props.dispatch({
          //   type: PLAYER.SONG_STATUS,
          //   data: {
          //     url: this.getUrl(),
          //     playing: false,
          //   }
          // });
        }}/>
        <Button title={'播放'} onPress={() => {
          playOrPause();
          // this.props.dispatch({
          //   type: PLAYER.SONG_STATUS,
          //   data: {
          //     playing: !player.playing,
          //   }
          // });
        }}/>
        <Button title={'seek'} onPress={() => {
          seek(60);
          // this.ref.seek(60);
        }}/>
        <Button title={'test'} onPress={() => {
          playOrPause();
        }}/>
        <Button title={'path'} onPress={() => {
          playOrPause();
        }}/>
        */}
        {!!url && (
        <Video
          source={{uri: url}}
          // poster={'https://baconmockup.com/300/200/'} // An image to display while the video is loading
          // controls={true}                         // Determines whether to show player controls.
          ref={(ref) => updateRef(ref)}
          rate={1.0}                              // 0 is paused, 1 is normal.
          volume={1.0}                            // 0 is muted, 1 is normal.
          muted={false}                           // Mutes the audio entirely.
          paused={!player.playing}                     // Pauses playback entirely.
          resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
          repeat={true}                           // Repeat forever.
          playInBackground                 // Audio continues to play when app entering background.
          playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
          progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
          ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
          onLoadStart={this.onLoadStart}            // Callback when video starts to load
          onLoad={this.onLoad}               // Callback when video loads
          onProgress={this.onProgress}               // Callback every ~250ms with currentTime
          onEnd={this.onEnd}                      // Callback when playback finishes
          onError={this.onError}               // Callback when video cannot be loaded
          onBuffer={this.onBuffer}                // Callback when remote video is buffering
          onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
          style={{width: 0, height: 0}}
        />
        )}
      </View>
    );
  }
}

export default connect( ({player}) => ({
  id: player.id,
  player,
})
)(Player);
