import { Text, View,FlatList,TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQlite from 'expo-sqlite'

const db = SQlite.openDatabase('Drafts.db');


export default class Drafts extends Component {
    constructor(props) {
    super(props);
  this.state = {
    
    Message: "hello",
    Url: "http://127.0.0.1:3333/api/1.0.0/chat/",
    Data1: [],
    token: ''
  };
  this.getData = this.getData.bind(this)

  }


  componentWillMount(){
     this.getData();
  }

  componentDidMount = () => {
    
    this.myTime = setInterval(()=>{
      this.getData();
      
    }, 1000)
  }

  componentWillUnmount = () =>{
    clearInterval(this.myTime);
  }
 

getData() {
  db.transaction((tx) => {
    tx.executeSql(
        "SELECT ChatID, Message FROM Drafts",
        [],
        (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              console.log(results)
              this.setState({Data1:results.rows})
            }
        })
  })
}
sendDraft = async(chatid)=>{
  const sesh_token = await AsyncStorage.getItem('@session_token')
  
  let to_send = {
    message: this.state.sendMsg,
    
    };
    const fullURL = this.state.Url + chatid + "/message"
  return fetch(fullURL,{
    method: 'POST',
    headers: {
       'X-Authorization': sesh_token,
       'Content-Type': 'application/json'
    },
    body: JSON.stringify(to_send)
    
})
.then((response) => {
  if(response.status === 200){
    this.deleteDraft(chatid)
   
    
  }else{
    alert("Message could not be sent")
}
})
.then(async(json) => {

})
}


deleteDraft(chatid){
  console.log(chatid)
  db.transaction((tx) => {
    tx.executeSql('DELETE FROM Drafts WHERE ID = ?', [chatid])})
    this.getData()
    this.render()
  }


editDraft(message){
  db.transaction((tx) => {
    tx.executeSql('UPDATE Messages SET Message = ?' , [message] )})
  }



  render() {
    
    return (
      <View style={styles.Main}>
       
        <FlatList data ={this.state.Data1} 
        keyExtractor={item =>item.ID }
        renderItem={({item})=>
        <View style={styles.Text1}>

          <Text > {<b>Chat ID: </b>}{item.ChatID}{"\n"} {<b>Message:</b>} {item.Message} </Text> 
          <View style={styles.manageButtons} > 
          <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.sendDraft(item.ChatID)}><Text style={styles.Button}>Send Draft </Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.deleteDraft(item.ChatID)}><Text style={styles.Button}>Delete Draft </Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.props.navigation.navigate('editDraft', {item})}><Text style={styles.Button}>Edit Draft</Text></TouchableOpacity>
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