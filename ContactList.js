import { Text, View,FlatList,TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'


//import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ContactList extends Component {
    constructor(props) {
    super(props);
  this.state = {
    
    message: "hello",
    url: "http://127.0.0.1:3333/api/1.0.0/user/",
    data1: [],
   
  };
  this.fetchData = this.fetchData.bind(this)
    }
  componentWillMount(){
    console.log(this.state.message)
    this.fetchData();
  }
 
 removeContact(userid) {
  const url1 = this.state.url + userid + "/contact"
   return fetch(url1,{
  method: 'DELETE',
  headers: {
      //'Content-Type': 'application/json',
      'X-Authorization': 'a21764cda61efb6f144e9b29f4a89310'
  }
  
})
.then((response) => {
if(response.status === 200){
  this.fetchData()
  this.render()
}else if(response.status === 400){
  throw 'Invalid email or password';
}else{
  throw 'Something went wrong';
}
})
//console.log(userid)
}

blockContact(userid){
  const url1 = this.state.url + userid + "/block"
  return fetch(url1,{
 method: 'POST',
 headers: {
     
     'X-Authorization': 'a21764cda61efb6f144e9b29f4a89310'
 },
 body: ''
 
})
.then((response) => {
if(response.status === 200){
   return response.text()
}else if(response.status === 400){
 throw 'Invalid email or password';
}else{
 throw 'Something went wrong';
}
})
.then(async(json)=> {
   console.log("user blocked")
})
}


fetchData = async () => {
 
  return fetch("http://127.0.0.1:3333/api/1.0.0/contacts",{
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
  })
  .then(async(json) => {
    console.log(json[0]),

    this.setState({data1: json})
})
}
  render() {
    return (
      <View style={styles.main}>
        
        <FlatList data ={this.state.data1} 
        keyExtractor={item =>item.user_id }
        renderItem={({item})=>
        <View style={styles.text1}>

          <Text > {<b>ID: </b>}{item.user_id}{"\n"} {<b>Name:</b>} {item.first_name} {item.last_name} {"\n"} {<b>Email:</b>} {item.email}</Text> 
          <View style={styles.managebuttons} > 
          <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.removeContact(item.user_id)}><Text style={styles.button}>Remove Contact </Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.blockContact(item.user_id)}><Text style={styles.button}>Block Contact  </Text></TouchableOpacity>
          </View>
          
          
        
          </View>
        }/>

      
      </View>
    )
  }
}
const styles = StyleSheet.create({
    main:{
      flex:1
    },
    input:{
        backgroundColor: 'blue', 
        //position:'absolute',
        bottom:0,
        Height:40,
        width:50,
        alignSelf: 'center'
    },
    button:{
      //position: 'relative',
        bottom:0,
        textAlign: 'center',
        
    },
    text1:{
      textAlign:'center',
     // backgroundColor: 'blue',
      borderBottomWidth: 5
    },
    buttonContainer: {
      backgroundColor: 'red',
      paddingVertical: 15,
      width: 120,
      height: 45,
      alignSelf: 'center',
      marginBottom: 10,
      marginTop: 5,
      borderRadius: 15,
      marginLeft: 5
     },
     managebuttons:{
      flexDirection: 'row',
      alignSelf: 'center'
     }

})