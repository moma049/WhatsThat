import { Text, View,FlatList,TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AddUser extends Component {
    constructor(props) {
        super(props);
      this.state = {
        Data1: [],
        Url: "http://127.0.0.1:3333/api/1.0.0/chat/",
        endOfUrl: "/contact",
        chat_id: this.props.route.params.chat_id
      };
      this.fetchData = this.fetchData.bind(this)
    }
    componentWillMount(){
        this.fetchData();
      }
    
    addUser = async(userId)=> {

      const sesh_token = await AsyncStorage.getItem('@session_token')
      // add the user to the chat 
      const Url1 = this.state.Url + this.state.chat_id+ "/user/"+ userId
       return fetch(Url1,{
      method: 'POST',
      headers: {
          
          'X-Authorization': sesh_token
      },
      body: ''
      
    })
    .then((response) => {
    if(response.status === 200){
      alert("User successfully added ");
    }else if(response.status === 400){
      alert("User Already Added");
    }else{
      alert("Could not add User ");
    }
    })
    .then(async(json)=> {
    
    })
    
    }
    fetchData = async () => {
      const sesh_token = await AsyncStorage.getItem('@session_token')
 
        // fetch all users to be shown in the flatlist
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
        <View style={styles.Text1}>

          <Text > {<b>ID: </b>}{item.user_id}{"\n"} {<b>Name:</b>} {item.given_name} {item.family_name} {"\n"} {<b>Email:</b>} {item.email}</Text> 

          <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.addUser(item.user_id)}><Text style={styles.Button}>Add User </Text></TouchableOpacity>
          
        
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
    Button:{
        bottom:0,
        alignSelf: 'center'
    },
    Text1:{
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