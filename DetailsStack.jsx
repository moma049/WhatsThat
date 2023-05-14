import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import chatDetails from './ChatDetails'
import changeChatName from './ChangeChatName'



const stack = createStackNavigator();

export default class ChatStack extends Component {
  render() {
    return (
     <stack.Navigator>
        <stack.Screen  
        name='Details'
        component={chatDetails}/>
        <stack.Screen  
        name='ChangeChatName'
        component={changeChatName}/>
     </stack.Navigator>
    )
  }
}