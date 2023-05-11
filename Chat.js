import { Text, Touchable, View ,FlatList,StyleSheet,TouchableOpacity,TextInput} from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class Chat extends Component {
  constructor(props) {
    super(props);
  this.state = {
    name: '',
    url: "http://127.0.0.1:3333/api/1.0.0/chat",
    data1: [],
    chatid: null
  };

  }  
  componentWillMount(){
    
    this.fetchData();
  }
  NewChat(){
    let to_send = {
      name: this.state.name,
      };
      console.log(to_send)
      return fetch("http://127.0.0.1:3333/api/1.0.0/chat",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': 'a21764cda61efb6f144e9b29f4a89310'
          },
          body: JSON.stringify(to_send)
      })
      .then((response) => {
        if(response.status === 201){
          return response.json()
        }else if(response.status === 400){
          throw 'Invalid email or password';
        }else{
          throw 'Something went wrong';
      }
      })
      .then(async (json) => {
        console.log(json);
        await AsyncStorage.setItem('chat_id', json.chat_id);
        this.fetchData();
        this.render()
    })
    }
  
  fetchData() {
    const url1 = this.state.url 
     return fetch(url1,{
    method: 'GET',
    headers: {
        
        'X-Authorization': 'a21764cda61efb6f144e9b29f4a89310'
    }
    
  })
  .then((response) => {
  if(response.status === 200){
    return response.json()
  }else if(response.status === 400){
    throw 'Invalid email or password';
  }else{
    throw 'Something went wrong';
  }
  }) .then(async(json) => {
    console.log(json),
    this.setState({data1: json})
})
  
  }
  render() {
   
    return (
   
      <View>
        <TextInput placeholder= "chat name"
        onChangeText={(name) => this.setState({name})}
        value= {this.state.name}
        />
        <TouchableOpacity  style={styles.buttonContainer}  onPress={() => this.NewChat()}>
        <Text style={styles.button}>
                Create New Chat 
            </Text>
        </TouchableOpacity>

          <FlatList data ={this.state.data1} 
        keyExtractor={item =>item.chat_id }
        renderItem={({item})=>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('MessageStack',{screen : 'messages', params: {item}})}>
        <View style={styles.text1}>

          <Text > {<b>ID: </b>}{item.chat_id}{"\n"} {<b>Name:</b>} {item.name} </Text> 
           
        
          </View>
          </TouchableOpacity>
        }/>
        <View>

        </View>
      </View>
     
      
    )
  }
}
const styles = StyleSheet.create({
  text1:{
    textAlign:'center',
   // backgroundColor: 'blue',
    borderBottomWidth: 5
  },
  buttonContainer: {
    backgroundColor: 'red',
    paddingVertical: 15,
   },
   button:{
    textAlign: 'center',
    fontWeight: 500,
    color: 'black'
  
   },
})