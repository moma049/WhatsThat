import { Text, View, TextInput,Image,StyleSheet,TouchableOpacity,FlatList} from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ChatDetails extends Component {
    constructor(props){
        super(props)
    
        this.state = {
          chat_id: this.props.route.params.chat_id,
          Url: "http://127.0.0.1:3333/api/1.0.0/chat/",
          chatName:  "",
          creatorFirstName: "",
          creatorLastName: "",
          Users: []
        }
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
      
    
      removeUser = async(userId) => {
        const sesh_token = await AsyncStorage.getItem('@session_token')
        
        const Url1 = this.state.Url + this.state.chat_id+ "/user/"+ userId 
        return fetch(Url1,{
       method: 'DELETE',
       headers: {
           
           'X-Authorization': sesh_token
       },
       body: ''
       
      })
      .then((response) => {
      if(response.status === 200){
        alert("User removed");
      }else{
       alert("User could not be removed");
      }
      })
      .then(async(json)=> {
         this.fetchData()
         this.render()
      })
      }

      fetchData = async () => {
        const sesh_token = await AsyncStorage.getItem('@session_token')
        
        const Url1 = this.state.Url + this.state.chat_id
        return fetch(Url1,{
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
          this.setState({chatName: json.name})
          this.setState({creatorFirstName: json.creator.first_name})
          this.setState({creatorLastName: json.creator.last_name})
          this.setState({Users: json.members})
        
      })
      }
  render() {
    const chat_id = this.state.chat_id
    return (
        <View>
        
    
        <Text style={styles.Text}><b>Chat Name: </b> {this.state.chatName}</Text>
        
        <Text style={styles.Text}><b> Creator Name: </b>{this.state.creatorFirstName} {this.state.creatorLastName} </Text>

        <View style={styles.manageButtons}>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this.props.navigation.navigate('ChangeChatName', {chat_id})}>
            <Text style={styles.Button}>
                Change Chat Name 
            </Text>
        </TouchableOpacity>
       
        </View>
        <View>
            <Text style={styles.Heading} > <b>Chat Users</b></Text>
        </View>
        <View
            style={styles.Line}
        />
       
        <FlatList data ={this.state.Users} 
        keyExtractor={item =>item.user_id }
        renderItem={({item})=>
        <View style={styles.Text1}>

          <Text > {<b>ID: </b>}{item.user_id}{"\n"} {<b>Name:</b>} {item.first_name} {item.last_name} {"\n"} {<b>Email:</b>} {item.email}</Text> 

          <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.removeUser(item.user_id)}><Text style={styles.Button}>Remove User </Text></TouchableOpacity>
          
          </View>
          
        }/>
     
      </View>


      
    )
  }
}

const styles = StyleSheet.create({
  
  Text:{
    alignSelf: 'center',
    fontSize: 15
  
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
   manageButtons:{
    flexDirection: 'row',
    alignSelf: 'center'
   },
   Button:{
      bottom:0,
      textAlign: 'center',
      
  },
  Line: {
    borderBottomColor: 'black',
    borderBottomWidth: 3,
  },
  Heading:{
    alignSelf: 'center',
    fontSize: 30
  },
  Text1:{
    textAlign:'center',
    borderBottomWidth: 5
  }
  })