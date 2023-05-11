import { Text, View,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import React, { Component } from 'react'

export default class ChangeChatName extends Component {
    constructor(props){
        super(props)
    
        this.state = {
          
          chat_id: 1,
          url: "http://127.0.0.1:3333/api/1.0.0/chat/",
          name:"",
          chat_name: ""
        }
      }

 fetchData = async () => {
    let to_send = {
      name:this.state.name,
 
      };
      const url1 = this.state.url + this.state.chat_id
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
      this.props.navigation.goBack()
  })
  }
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.container1}>
        <Text><b>ChangeName:</b> </Text>
        <TextInput style={styles.input} 
          placeholder="Enter New Chat Name" 
          onChangeText={(name) => this.setState({name})}
        value={this.state.name}
           >
        </TextInput>
        </View>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this.fetchData()}>
            <Text style={styles.button}>
                Apply Changes
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