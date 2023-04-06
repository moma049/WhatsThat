import { Text, View } from 'react-native'
import React, { Component } from 'react'
import ContactList from './ContactList'

export default class Contacts extends Component {
  render() {
    return (
      <View>
        <ContactList/>
      </View>
    )
  }
}