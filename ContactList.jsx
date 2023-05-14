import { Text, View,FlatList,TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ContactList extends Component {
    constructor(props) {
    super(props);
  this.state = {
    
    Message: "hello",
    Url: "http://127.0.0.1:3333/api/1.0.0/user/",
    Data1: [],
    token: ''
  };
  this.fetchData = this.fetchData.bind(this)
  }


  componentWillMount(){
   
    this.fetchData();
  }

  componentDidMount = () => {
    
    this.myTime = setInterval(()=>{
      this.fetchData();
      
    }, 1000)
  }

  componentWillUnmount = () =>{
    clearInterval(this.myTime);
  }
 
 removeContact= async(userId)=> {
  const sesh_token = await AsyncStorage.getItem('@session_token')

  const Url1 = this.state.Url + userId + "/contact"
   return fetch(Url1,{
  method: 'DELETE',
  headers: {
      'X-Authorization': sesh_token
  }
})
.then((response) => {
if(response.status === 200){
  this.fetchData()
  this.render()
}else{
  alert("Contact could not be removed")
}
})

}

blockContact = async(Userid)=>{
  const sesh_token = await AsyncStorage.getItem('@session_token')
 

  const Url1 = this.state.Url + Userid + "/block"
  return fetch(Url1,{
 method: 'POST',
 headers: {
     
     'X-Authorization': sesh_token
 },
 body: ''
 
})
.then((response) => {
if(response.status === 200){
  alert("User Blocked")
}else{
 alert("User could not be blocked")
}
})
.then(async(json)=> {
  
})
}


fetchData = async () => {
  
  const sesh_token = await AsyncStorage.getItem('@session_token')
 
  return fetch("http://127.0.0.1:3333/api/1.0.0/contacts",{
      method: 'GET',
      headers: {
          
          'X-Authorization': sesh_token
      }
      
  })
  .then((response) => {
    if(response.status === 200){
      return response.json()
    }else{
      alert("Details could not be retrieved")
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
        <View style={styles.Text1}>

          <Text > {<b>ID: </b>}{item.user_id}{"\n"} {<b>Name:</b>} {item.first_name} {item.last_name} {"\n"} {<b>Email:</b>} {item.email}</Text> 
          <View style={styles.manageButtons} > 
          <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.removeContact(item.user_id)}><Text style={styles.Button}>Remove Contact </Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.blockContact(item.user_id)}><Text style={styles.Button}>Block Contact  </Text></TouchableOpacity>
          </View>
          
          
        
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
        //position:'absolute',
        bottom:0,
        Height:40,
        width:50,
        alignSelf: 'center'
    },
    Button:{
      //position: 'relative',
        bottom:0,
        textAlign: 'center',
        
    },
    Text1:{
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
     manageButtons:{
      flexDirection: 'row',
      alignSelf: 'center'
     }

})