import { Text, View,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import * as EmailValidator from 'email-validator';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ChangePassword extends Component {
  constructor(props){
    super(props)

    this.state = {
      data:  this.props.route.params.data,
      Url: "http://127.0.0.1:3333/api/1.0.0/user/",
      Error: "", 
      Submitted: false,
      Password: ''
    }
  }
  _onPressButton(){ 

    this.setState({Submitted: true})
    this.setState({Error: ""})

    if(!( this.state.Password)){
        this.setState({Error: "Must enter  password"})
        alert("Must enter password")
        return;
    }

  
    const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    if(!PASSWORD_REGEX.test(this.state.Password)){
        this.setState({error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)"})
        alert("Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)")
        return;
    }
    this.changePassword();
   
}
  changePassword = async () => {
    const sesh_token = await AsyncStorage.getItem('@session_token')
    const Id =  await AsyncStorage.getItem('@session_id')
    let to_send = {
      first_name:this.state.data.first_name,
      last_name:this.state.data.last_name,
      email: this.state.data.email,
      password: this.state.Password
      };
      const url1 = this.state.Url + Id
    return fetch(url1,{
      method: 'PATCH',
      headers: {
        'X-Authorization': sesh_token,
        'Content-Type': 'application/json'
        
      },
      body: JSON.stringify(to_send)
        
    })
    .then((response) => {
      if(response.status === 200){
        alert("Password Changed")
      }else{
        alert("Unable to change Password");
    }
    })
    .then(async(json) => {
      
      this.props.navigation.navigate('Account')
      
  })
  }
  render() {
    return (
      <View style={styles.Main}>
        <View style={styles.Container1}>
        <Text><b>Change Password:</b> </Text>
        <TextInput style={styles.Input} 
          placeholder="Enter New Password" 
          onChangeText={(Password) => this.setState({Password})}
        value={this.state.Password}
           >
        </TextInput>
        </View>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this._onPressButton()}>
            <Text style={styles.Button}>
                CONFIRM
            </Text>
        </TouchableOpacity>
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
Main:{
  flex:1
},
Container1 : {
  marginTop:50,
  alignSelf:'center',
  flexDirection: 'row',
},
Input: {
  borderWidth:2,
  Height:30,
  width:150,
},
buttonContainer: {
  backgroundColor: 'red',
  paddingVertical: 15,
  width: 150,
  height: 45,
  alignSelf: 'center',
  marginBottom: 10,
  marginTop: 5,
  borderRadius: 15,
  marginLeft: 5
 },
 Button:{
    bottom:0,
    textAlign: 'center',
    
}})