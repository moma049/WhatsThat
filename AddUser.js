import { Text, View,FlatList,TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class AddUser extends Component {
    constructor(props) {
        super(props);
      this.state = {
        data1: [],
        message: "hello",
        url: "http://127.0.0.1:3333/api/1.0.0/chat/",
        endofurl: "/contact",
        chat_id: this.props.route.params.chat_id
      };
      this.fetchData = this.fetchData.bind(this)
    }
    componentWillMount(){
        console.log(this.state.message)
        this.fetchData();
      }
    
      addUser(userid) {
      const url1 = this.state.url + this.state.chat_id+ "/user/"+ userid
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
      alert("User Already Added")
    }else{
      throw 'Something went wrong';
    }
    })
    .then(async(json)=> {
     
    })
    
    }
    fetchData = async () => {
 
        return fetch("http://127.0.0.1:3333/api/1.0.0/search",{
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

          <Text > {<b>ID: </b>}{item.user_id}{"\n"} {<b>Name:</b>} {item.given_name} {item.family_name} {"\n"} {<b>Email:</b>} {item.email}</Text> 

          <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.addUser(item.user_id)}><Text style={styles.button}>Add User </Text></TouchableOpacity>
          
        
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
        alignSelf: 'center'
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
      alignSelf: 'center',
      marginBottom: 10,
      marginTop: 5,
      borderRadius: 15
     }

})