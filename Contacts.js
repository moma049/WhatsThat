import { Text, View } from 'react-native'
import React, { Component } from 'react'
import ContactList from './ContactList'
import AddContact from './AddContact'
import BlockContact from './BlockContact'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


const Drawer = createDrawerNavigator();
export default class Contacts extends Component {
  render() {
    return (
   
      <Drawer.Navigator>
        <Drawer.Screen name = "ContactList" component={ContactList}/>
        <Drawer.Screen name = "Add New Contact" component={AddContact}/>
        <Drawer.Screen name = "Blocked Users" component={BlockContact}/>
      </Drawer.Navigator>
     
    )
  }
}