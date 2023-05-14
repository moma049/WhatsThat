import { Text, View,StyleSheet,Image, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import appLogo from '../AppLogo'

export default class HomePage extends Component {
  render() {
    return (
      <View style = {styles.container}>
         <Image
        source={require('../assets/logo1.png')}
        style={styles.logo}
        />
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
    logo:{
      width: 200, 
      height: 150,
      alignSelf: 'center',
      marginTop:50
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