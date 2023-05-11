import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ChatDetails from './ChatDetails';
import AddUser from './AddUser';
import messages1 from './messages1'
import messages from './messages'
import DetailStack from './DetailsStack'



const stack = createStackNavigator();

export default class ChatStack extends Component {
  render() {
    return (
     <stack.Navigator>
        <stack.Screen  
        name='messages'
        component={messages}/>
        <stack.Screen  
        name='options'
        component={messages1}/>
        <stack.Screen  
        name='DetailsStack'
        component={DetailStack}/>
        <stack.Screen  
        name='AddUser'
        component={AddUser}/>
     </stack.Navigator>
    )
  }
}