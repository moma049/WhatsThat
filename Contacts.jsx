import { Text, View } from 'react-native'
import React, { Component } from 'react'
import contactList from './ContactList'
import addContact from './AddContact'
import blockContact from './BlockContact'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


const Drawer = createDrawerNavigator();
export default class Contacts extends Component {
  render() {
    return (
   
      <Drawer.Navigator>
        <Drawer.Screen name = "ContactList" component={contactList}/>
        <Drawer.Screen name = "Add New Contact" component={addContact}/>
        <Drawer.Screen name = "Blocked Users" component={blockContact}/>
      </Drawer.Navigator>
     
    )
  }
}