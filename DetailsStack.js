import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import ChatDetails from './ChatDetails'
import ChangeChatName from './ChangeChatName'
import AddUser from './AddUser';


const stack = createStackNavigator();

export default class ChatStack extends Component {
  render() {
    return (
     <stack.Navigator>
        <stack.Screen  
        name='Details'
        component={ChatDetails}/>
        <stack.Screen  
        name='ChangeChatName'
        component={ChangeChatName}/>
     </stack.Navigator>
    )
  }
}