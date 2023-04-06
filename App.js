import { Text, View,StyleSheet, AppRegistry} from 'react-native'
import React, { Component } from 'react'
import Home from './Screens/HomePage';
import LoginForm from './Screens/LoginForm';
import SignUp from './Screens/SignUp';
import MainAppNav from './MainAppNav';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      
     <NavigationContainer> 
        <MainAppNav/>
      {/*  <stack.Navigator>
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
        </stack.Navigator>
        */}

      </NavigationContainer>

  
    );
  }
}
const styles = StyleSheet.create({
 
})