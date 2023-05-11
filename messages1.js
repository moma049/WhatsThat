import { Text, View,FlatList,TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class messages1 extends Component{
  constructor(props) {
    super(props);
  this.state = {
    sendmsg: "",
   // item: this.props.route.params.item.message_id,
    obj : this.props.route.params.obj,
    url: "http://127.0.0.1:3333/api/1.0.0/chat/"
  };
  
}
componentWillMount(){
 
  }
deletemsg(){
    const full_URL = this.state.url + this.state.obj.chat_id + "/message/" + this.state.obj.item.message_id
  return fetch( full_URL,{
    method: 'DELETE',
    headers: {
      'X-Authorization': 'a21764cda61efb6f144e9b29f4a89310',
      
      
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
editmsg(){
  
  let to_send = {
    first_name:this.state.sendmsg,
   
    };
    const full_URL = this.state.url + this.state.obj.chat_id + "/message/" + this.state.obj.item.message_id
    console.log(to_send)
  return fetch(full_URL,{
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
        onPress={() => this.test()}>
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