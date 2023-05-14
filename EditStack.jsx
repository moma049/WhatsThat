import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';


import individualMessage from './IndividualMessage'
import editMessage from './EditMessage';




const stack = createStackNavigator();

export default class ChatStack extends Component {
  render() {
    return (
     <stack.Navigator>
        <stack.Screen  
        name='options'
        component={individualMessage}/>
        <stack.Screen  
        name='EditMessage'
        component={editMessage}/>
       
     </stack.Navigator>
    )
  }
}