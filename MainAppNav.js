import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Contacts from './Contacts';
import chat from './Chat';
import Account from './Account';
import Search from './Search';
import ContactList from './ContactList';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export default class MainAppNav extends Component {
  render() {
    return (
    
      <Tab.Navigator>
        <Tab.Screen name = "Contacts" component={Contacts}/>
        <Tab.Screen name = "Chat" component={chat}/>
        <Tab.Screen name = "Search" component={Search}/>
        <Tab.Screen name='Account' component={Account}/>
      </Tab.Navigator>
  
    )
  }
}