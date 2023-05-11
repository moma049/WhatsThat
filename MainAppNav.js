import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Contacts from './Contacts';
import chat from './Chat';
import Account from './Account';
import Search from './Search';
import ContactList from './ContactList';
import AccountNav from './AccountNav';
import ChatDraw from './ChatDraw';
import { NavigationContainer } from '@react-navigation/native';
import ChatStack from './ChatStack';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export default class MainAppNav extends Component {
  render() {
    return (
    
      <Tab.Navigator>
        <Tab.Screen name = "Contacts" component={Contacts}/>
        <Tab.Screen name = "ChatStack" component={ChatStack}/>
        <Tab.Screen name = "Search" component={Search}/>
        <Tab.Screen name='AccountNav' component={AccountNav}/>
      </Tab.Navigator>
  
    )
  }
}