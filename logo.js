import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

export default function logo() {
  return (
    <View  style={styles.logoContainer}>
        <Image
        source={require('./assets/WhatsIcon.png')}
        style={styles.logo}
        />
        </View>
  )
}

const styles = StyleSheet.create({
  logo:{
       
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