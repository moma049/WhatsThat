import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import addUser from './AddUser';
import individualMessage from './IndividualMessage'
import Messages from './Messages'
import detailStack from './DetailsStack'
import editStack from './EditStack'



const stack = createStackNavigator();

export default class ChatStack extends Component {
  render() {
    return (
     <stack.Navigator>
        <stack.Screen  
        name='messages'
        component={Messages}/>
        <stack.Screen  
        name='options'
        component={individualMessage}/>
        <stack.Screen  
        name='DetailsStack'
        component={detailStack}/>
        <stack.Screen  
        name='AddUser'
        component={addUser}/>
     </stack.Navigator>
    )
  }
}