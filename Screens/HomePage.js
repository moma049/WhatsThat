import { Text, View,StyleSheet,Image, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import Logo from '../logo'

export default class HomePage extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <Logo/>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text style={styles.button}>
                Sign In
            </Text>
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.button}>
                Sign Up
            </Text>
            
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34eb8c',
    },
    buttonContainer: {
        backgroundColor: 'red',
        paddingVertical: 10,
        width: 100,
        alignSelf: 'center',
        marginTop: 40,
        borderRadius: 5,
        justifyContent: 'center'
        
       },
       button:{
        textAlign: 'center',
        fontWeight: 500,
        color: 'black'
    
       }
    
})