import { Text, View,FlatList,TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class messages1 extends Component{
  constructor(props) {
    super(props);
  this.state = {
    sendmsg: "",
    obj : this.props.route.params.obj,
    url: "http://127.0.0.1:3333/api/1.0.0/chat/"
  };
  
}
componentWillMount(){
 
  }
deletemsg = async()=>{
  const sesh_token = await AsyncStorage.getItem('@session_token')

    const full_URL = this.state.url + this.state.obj.chat_id + "/message/" + this.state.obj.item.message_id
  return fetch( full_URL,{
    method: 'DELETE',
    headers: {
      'X-Authorization': sesh_token
      
      
    },
  
      
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
    this.props.navigation.navigate('messages')
})
}
_onPressEdit(){ 

  this.setState({submitted: true})
  this.setState({error: ""})

  if(!(this.state.sendmsg)){
      this.setState({error: "Enter New message"})
      alert("Enter New Message")
      return;
  }

  this.editmsg();
 
}

editmsg = async()=>{
  const sesh_token = await AsyncStorage.getItem('@session_token')
 
  let to_send = {
    message:this.state.sendmsg,
   
    };
    const full_URL = this.state.url + this.state.obj.chat_id + "/message/" + this.state.obj.item.message_id
    console.log(to_send)
  return fetch(full_URL,{
    method: 'PATCH',
    headers: {
      'X-Authorization': sesh_token,
      'Content-Type': 'application/json'
      
    },
    body: JSON.stringify(to_send)
      
  })
  .then((response) => {
    if(response.status === 200){
      alert("Message changed")
      this.props.navigation.navigate('messages')
    }else{
      alert('Message could not be Edited')
  }
  })
  .then(async(json) => {
    
    
})
}
test(){
  
  console.log(this.state.obj.chat_id)
}
  render() {
    
    return (
      <View>
        
        <Text><b >Orignal Message:</b> {this.state.obj.item.message} </Text>
        <TextInput placeholder= "Type new message here"
        onChangeText={(sendmsg) => this.setState({sendmsg})}
        value= {this.state.sendmsg} style={styles.input}/>

        <View style={styles.buttons}>
         <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this.deletemsg()}>
            <Text style={styles.button}>
                DELETE
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this._onPressEdit()}>
            <Text style={styles.button}>
                EDIT
            </Text>
            
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({

  buttonContainer: {
   backgroundColor: 'red',
   paddingVertical: 15,
   alignItems: 'center',
   padding: 10,
   margin: 10
  },
  button:{
   textAlign: 'center',
   fontWeight: 500,
   color: 'black',
   width: 50

  },
  buttons: {
    flexDirection: 'row'
  },
  input: {
    height: 30
  }
 
})