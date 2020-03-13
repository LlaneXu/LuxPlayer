/***

 @Time    : 2020-03-13 16:30
 @Author  : Lei Xu
 @Email   : Llane_xu@outlook.com
 @File    : stores.py

 Description:

 Update:

 Todo:

 ***/

import { createStore } from 'redux';
import reducer from './reducer';

export let store = createStore(reducer);
