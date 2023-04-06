import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Contacts from './Contacts';
import chat from './Chat';
import Account from './Account';
import Search from './Search';
import ContactList from './ContactList';

const Tab = createBottomTabNavigator();
export default class MainAppNav extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name = "ContactList" component={ContactList}/>
        <Tab.Screen name = "Chat" component={chat}/>
        <Tab.Screen name = "Search" component={Search}/>
        <Tab.Screen name='Account' component={Account}/>
      </Tab.Navigator>
    )
  }
}