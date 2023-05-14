import { Text, View,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import React, { Component } from 'react'

export default class ChangeChatName extends Component {
    constructor(props){
        super(props)
    
        this.state = {
        obj : this.props.route.params.obj,
        Url: "http://127.0.0.1:3333/api/1.0.0/chat/",
        Message:"",
        chatName: ""
        }
      }

 changeName = async () => {
    let to_send = {
      message:this.state.Message,
 
    };
      const Url1 = this.state.Url + this.state.obj.chat_id + "/message/" + this.state.obj.message_id
      console.log(to_send)

    return fetch(Url1,{
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
      this.props.navigation.goBack()
  })
  }
  render() {
    return (
      <View style={styles.Main}>
        <View style={styles.Container1}>
        <Text><b>ChangeName:</b> </Text>
        <TextInput style={styles.input} 
          placeholder="Enter New Chat Name" 
          onChangeText={(Name) => this.setState({Name})}
        value={this.state.Name}
           >
        </TextInput>
        </View>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this.changeName()}>
            <Text style={styles.Button}>
                Apply Changes
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