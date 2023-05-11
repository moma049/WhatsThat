import { Text, View,StyleSheet,TextInput,TouchableOpacity,Alert} from 'react-native'
import React, { Component } from 'react'
import * as EmailValidator from 'email-validator';

export default class ChangeEmail extends Component {
  constructor(props){
    super(props)

    this.state = {
      
   
      url: "http://127.0.0.1:3333/api/1.0.0/user/",
      data:  this.props.route.params.data,
      last_name: "Seed",
      password:"Tineo1999$",
      email: "",
      error: "",
      submitted: false
    }
  }
  _onPressButton(){ 

    this.setState({submitted: true})
    this.setState({error: ""})

    if(!(this.state.email )){
        this.setState({error: "Must enter email"})
        alert("Must enter email ")
        return;
    }

    if(!EmailValidator.validate(this.state.email)){
        this.setState({error: "Must enter valid email"})
        alert("Must enter valid email")
        return;
    }

  

    console.log("Button clicked: " + this.state.email )
    console.log("Validated and ready to send to the API");
    this.changeEmail();
   
}
  
  changeEmail = async () => {
    let to_send = {
      first_name:this.state.data.first_name,
      last_name:this.state.data.last_name,
      email: this.state.email,
      password: this.state.password
      };
      const url1 = this.state.url + this.state.id
      console.log(to_send)
    return fetch(url1,{
      method: 'PATCH',
      headers: {
        'X-Authorization': 'a21764cda61efb6f144e9b29f4a89310',
        'Content-Type': 'application/json'
        
      },
      body: JSON.stringify(to_send)
        
    })
    .then((response) => {
      if(response.status === 200){
        return response
      }else if(response.status === 400){
        throw 'Bad Request';
      }else{
        throw 'Something went wrong';
    }
    })
    .then(async(json) => {
      console.log(json)
      
  })
  }
  render() {
    console.log(this.state.data.last_name)
    return (
      <View style={styles.main}>
        <View style={styles.container1}>
        <Text><b>New Email:</b> </Text>
        <TextInput style={styles.input} 
          placeholder="Enter New Email" 
          onChangeText={(email) => this.setState({email})}
        value={this.state.email}
           >
        </TextInput>
        </View>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this._onPressButton()}>
            <Text style={styles.button}>
                CONFIRM
            </Text>
        </TouchableOpacity>
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
  main:{
    flex:1
  },
  container1 : {
    marginTop:50,
    alignSelf:'center',
    flexDirection: 'row',
   

  },
input: {
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
 },button:{
  //position: 'relative',
    bottom:0,
    textAlign: 'center',
    
}})