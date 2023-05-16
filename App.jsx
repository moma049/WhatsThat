import "react-native-reanimated"
import { Text, View,StyleSheet, AppRegistry} from 'react-native'
import React, { Component } from 'react'
import Home from './Screens/HomePage';
import LoginForm from './Screens/LoginForm';
import SignUp from './Screens/SignUp';
import MainAppNav from './MainAppNav';
import Contacts from './Contacts';
import CameraTakePicture from './CameraTakePhoto';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
global.__reanimatedWorkletInit = () => {};

import SQLite from 'react-native-sqlite-storage';


const stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      
     <NavigationContainer> 
    
          
       <stack.Navigator>
         {/* <stack.Screen
          name='Home'
          component={Home}
          /> 
          <stack.Screen
          name='SignUp'
          component={SignUp}
          />  */}
          <stack.Screen
          name='Home'
          component={Home}
          /> 
          <stack.Screen
          name='SignUp'
          component={SignUp}
          /> 
          <stack.Screen
          name='SignIn'
          component={LoginForm}
          /> 
           <stack.Screen
          name='MainApp'
          component={MainAppNav}
          /> 
        </stack.Navigator>
        

      </NavigationContainer>

  
    );
  }
}
const styles = StyleSheet.create({
 
})