import { Text, View,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ChangeName extends Component {
  constructor(props){
    super(props)

    this.state = {
      Url: "http://127.0.0.1:3333/api/1.0.0/user/",
      data:  this.props.route.params.data,
      firstName:  "",
      lastName: "",
      Password:"Tineo1999$",
      
    }
  }
  _onPressButton(){ 

    this.setState({submitted: true})
    this.setState({error: ""})

    if(!(this.state.firstName && this.state.lastName)){
        this.setState({error: "Must enter First and Last name"})
        alert("Must enter First and Last Name")
        return;
    }

    this.changeName();
   
}
  
  changeName = async () => {
    const sesh_token = await AsyncStorage.getItem('@session_token')
    const Id = await AsyncStorage.getItem('@session_id')
    let to_send = {
      first_name:this.state.firstName,
      last_name:this.state.lastName,
      email: this.state.data.email,
      password: this.state.Password
      };
      const Url1 = this.state.Url + Id
      console.log(to_send)
    return fetch(Url1,{
      method: 'PATCH',
      headers: {
        'X-Authorization': sesh_token,
        'Content-Type': 'application/json'
        
      },
      body: JSON.stringify(to_send)
        
    })
    .then((response) => {
      if(response.status === 200){
        alert("Name Changed");
      }
      else{
        alert("Name could not be Changed");
    }
    })
    .then(async(json) => {
      this.props.navigation.navigate('Account');
      
  })
  }
  render() {
    return (
      <View style={styles.Main}>
        <View style={styles.Container1}>
        <Text><b>First Name:</b> </Text>
        <TextInput style={styles.Input} 
          placeholder="Enter First Name" 
          onChangeText={(firstName) => this.setState({firstName})}
        value={this.state.firstName}
           >
        </TextInput>
         </View>
         <View style={styles.Container1}>
        <Text><b>Last Name:</b> </Text>
        <TextInput style={styles.Input} 
          placeholder="Enter Last Name" 
          onChangeText={(lastName) => this.setState({lastName})}
        value={this.state.lastName}
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
  marginTop:30,
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