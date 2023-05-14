import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Contacts from './Contacts';
import Search from './Search';
import accountNav from './AccountNav';
import { NavigationContainer } from '@react-navigation/native';
import chatStack from './ChatStack';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export default class MainAppNav extends Component {
  render() {
    return (
    
      <Tab.Navigator>
        <Tab.Screen name = "Contacts" component={Contacts}/>
        <Tab.Screen name = "ChatStack" component={chatStack}/>
        <Tab.Screen name = "Search" component={Search}/>
        <Tab.Screen name='AccountNav' component={accountNav}/>
      </Tab.Navigator>
  
    )
  }
}