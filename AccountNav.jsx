import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Account from './Account';
import changeName from './ChangeName';
import changeEmail from './ChangeEmail';
import changePassword from './ChangePassword';
import camera1 from './CameraTakePhoto'

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
                component={changeEmail}/>
                 <stack.Screen 
                name='Password'
                component={changePassword}/>
                 <stack.Screen 
                name='Name'
                component={changeName}/>
                <stack.Screen 
                name='Camera'
                component={camera1}/>
                
            </stack.Navigator>
       
    )
  }
}