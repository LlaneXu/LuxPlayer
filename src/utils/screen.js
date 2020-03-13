/***

 @Time    : 2020-03-13 10:25
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : screen.py

 Description:

 Update:

 Todo:

 ***/
import { Dimensions, PixelRatio } from 'react-native';

export default {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  onePixel: 1 / PixelRatio.get(),
  pageHeader: 50,
}
