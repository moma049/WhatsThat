import { Text, View,StyleSheet,TextInput,TouchableOpacity,Alert} from 'react-native'
import React, { Component } from 'react'
import * as EmailValidator from 'email-validator';

export default class ChangeEmail extends Component {
  constructor(props){
    super(props)

    this.state = {
      Url: "http://127.0.0.1:3333/api/1.0.0/user/",
      data:  this.props.route.params.data,
      Password:"Tineo1999$",
      Email: "",
      Error: "",
      Submitted: false,
    }
  }
  _onPressButton(){ 

    this.setState({Submitted: true})
    this.setState({Error: ""})

    if(!(this.state.Email )){
        this.setState({Error: "Must enter email"})
        alert("Must enter email ")
        return;
    }

    if(!EmailValidator.validate(this.state.Email)){
        this.setState({error: "Must enter valid email"})
        alert("Must enter valid email")
        return;
    }

  

    console.log("Button clicked: " + this.state.Email )
    console.log("Validated and ready to send to the API");
    this.changeEmail();
   
}
  
  changeEmail = async () => {
    const sesh_token = await AsyncStorage.getItem('@session_token')
    const Id = await AsyncStorage.getItem('@session_id')
    let to_send = {
      first_name:this.state.data.first_name,
      last_name:this.state.data.last_name,
      email: this.state.Email,
      password: this.state.Password
      };
      const url1 = this.state.Url + Id
      console.log(to_send)
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
        alert('Email address successfully changed');
      }else if(response.status === 400){
        alert ('Email address already in use');
      }else{
        alert('Email address could not be changed');
    }
    })
    .then(async(json) => {
      this.props.navigation.navigate('Account')
      
  })
  }
  render() {
    console.log(this.state.data.last_name)
    return (
      <View style={styles.Main}>
        <View style={styles.Container1}>
        <Text><b>New Email:</b> </Text>
        <TextInput style={styles.Input} 
          placeholder="Enter New Email" 
          onChangeText={(Email) => this.setState({Email})}
        value={this.state.Email}
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