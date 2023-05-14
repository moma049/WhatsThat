import { StyleSheet, Image, View } from 'react-native'
import React from 'react'


export default function AppLogo() {
  return (
    <View  style={styles.logoContainer}>
        <Image
        source={require('./assets/logo.png')}
        style={styles.Logo}
        />
        </View>
  )
}

const styles = StyleSheet.create({
  Logo:{
       
    width: 100, 
    height: 100,

},
logoContainer:{
    alignItems: 'center',
    //flexGrow: 1,
    //justifyContent: 'center',
    paddingTop: 100,


},
   
  
})