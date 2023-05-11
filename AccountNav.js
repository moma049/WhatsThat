import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Account from './Account';
import ChangeName from './ChangeName';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import Camera1 from './camera-takephoto'

const stack = createStackNavigator();

export default class AccountNav extends Component {
  render() {
    return (
        
            <stack.Navigator>
                <stack.Screen 
                name='Account'
                component={Account}/> 
                <stack.Screen 
                name='Email'
                component={ChangeEmail}/>
                 <stack.Screen 
                name='Password'
                component={ChangePassword}/>
                 <stack.Screen 
                name='Name'
                component={ChangeName}/>
                <stack.Screen 
                name='Camera'
                component={Camera1}/>
                
            </stack.Navigator>
       
    )
  }
}