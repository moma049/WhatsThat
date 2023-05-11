import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Chat from './Chat';
import messages from './messages'
import messages1 from './messages1'
import messageStack from './messagesStack'

import ChatDetails from './ChatDetails'


const stack = createStackNavigator();

export default class ChatStack extends Component {
  render() {
    return (
     <stack.Navigator>
        <stack.Screen  
        name='chat'
        component={Chat}/>
        <stack.Screen  
        name='MessageStack'
        component={messageStack}/>
     </stack.Navigator>
    )
  }
}