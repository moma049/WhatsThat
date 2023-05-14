import { Text, View,FlatList,TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class AddContact extends Component {
    constructor(props) {
    super(props);
  this.state = {
    Data1: [],
    Message: "hello",
    Url: "http://127.0.0.1:3333/api/1.0.0/user/",
    endOfUrl: "/contact"
  };
  this.fetchData = this.fetchData.bind(this)
    }
  componentWillMount(){
    console.log(this.state.Message)
    this.fetchData();
  }

  onPressButton(userId){
    const Id = AsyncStorage.getItem('@session_id')
    if (userId == Id) {
      alert("Cannot add yourself as a contact")
    }
    else {
      this.addContact(userId)
    }
  }

  addContact = async(userId)=> {
    const sesh_token = await AsyncStorage.getItem('@session_token')
    

  const Url1 = this.state.Url + userId + "/contact"
   return fetch(Url1,{
  method: 'POST',
  headers: {
      
      'X-Authorization': sesh_token
  },
  body: ''
  
  })
  .then((response) => {
  if(response.status === 200){
    return response.text()
  }else{
  alert ('Please try again later');
  }
  } )
  .then(async(json)=> {
    if(json == "Already a contact"){
      alert("This user is already a contact")
    }
    else {
      console.log("Contact added")
    }

  })

  }


fetchData = async () => {
  const sesh_token = await AsyncStorage.getItem('@session_token')
 
  return fetch("http://127.0.0.1:3333/api/1.0.0/search",{
      method: 'GET',
      headers: {
          
          'X-Authorization': sesh_token
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
  })
  .then(async(json) => {
    
    this.setState({Data1: json})
})
}
render() {
    return (
      <View style={styles.Main}>
        
        <FlatList data ={this.state.Data1} 
        keyExtractor={item =>item.user_id }
        renderItem={({item})=>
        <View style={styles.text1}>

          <Text > {<b>ID: </b>}{item.user_id}{"\n"} {<b>Name:</b>} {item.given_name} {item.family_name} {"\n"} {<b>Email:</b>} {item.email} </Text> 

          <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.onPressButton(item.user_id)}><Text style={styles.Button}>Add to Contacts </Text> </TouchableOpacity>
          
          </View>
        }/>

      
      </View>
    )
  }
}
const styles = StyleSheet.create({
    Main:{
      flex:1
    },
    Input:{
        backgroundColor: 'blue', 
        bottom:0,
        Height:40,
        width:50,
        alignSelf: 'center'
    },
    Button:{
        bottom:0,
        alignSelf: 'center'
    },
    text1:{
      textAlign:'center',
      borderBottomWidth: 5
    },
    buttonContainer: {
      backgroundColor: 'red',
      paddingVertical: 15,
      width: 120,
      alignSelf: 'center',
      marginBottom: 10,
      marginTop: 5,
      borderRadius: 15
     }

})