import { Text, View, TextInput,Image,StyleSheet,TouchableOpacity,FlatList} from 'react-native'
import React, { Component } from 'react'

export default class ChatDetails extends Component {
    constructor(props){
        super(props)
    
        this.state = {
          
          chat_id: this.props.route.params.chat_id,
          url: "http://127.0.0.1:3333/api/1.0.0/chat/",
          chat_name:  "",
          creator_first_name: "",
          creator_last_name: "",
          users: []
        }
      }
      componentWillMount(){
        //console.log(this.state.url + this.state.id)
        this.fetchData();
      }
      
    
      removeUser(){
        const url1 = this.state.url + this.state.chat_id+ "/user/"+ userid 
        return fetch(url1,{
       method: 'DELETE',
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
         console.log("user removed")
         this.fetchData()
         this.render()
      })
      }

      fetchData = async () => {
        const url1 = this.state.url + this.state.chat_id
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
        })
        .then(async(json) => {
          console.log(json)
          this.setState({chat_name: json.name})
          this.setState({creator_first_name: json.creator.first_name})
          this.setState({creator_last_name: json.creator.last_name})
          this.setState({users: json.members})
        
      })
      }
  render() {
    return (
        <View>
        
    
        <Text style={styles.text}><b>Chat Name: </b> {this.state.chat_name}</Text>
        
        <Text style={styles.text}><b> Creator Name: </b>{this.state.creator_first_name} {this.state.creator_last_name} </Text>

        <View style={styles.managebuttons}>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this.props.navigation.navigate('ChangeChatName')}>
            <Text style={styles.button}>
                Change Chat Name 
            </Text>
        </TouchableOpacity>
       
        </View>
        <View>
            <Text style={styles.heading} > <b>Chat Users</b></Text>
        </View>
        <View
            style={styles.line}
        />
       
        <FlatList data ={this.state.users} 
        keyExtractor={item =>item.user_id }
        renderItem={({item})=>
        <View style={styles.text1}>

          <Text > {<b>ID: </b>}{item.user_id}{"\n"} {<b>Name:</b>} {item.first_name} {item.last_name} {"\n"} {<b>Email:</b>} {item.email}</Text> 

          <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.unblock(item.user_id)}><Text style={styles.button}>Remove User </Text></TouchableOpacity>
          
          </View>
          
        }/>
      
       
        
      </View>


      
    )
  }
}

const styles = StyleSheet.create({
  
    logo:{
    alignSelf:'center',
     width: 100, 
     height: 100,
  
  },
  text:{
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
   managebuttons:{
    flexDirection: 'row',
    alignSelf: 'center'
   },
   button:{
    //position: 'relative',
      bottom:0,
      textAlign: 'center',
      
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 3,
  },
  heading:{
    alignSelf: 'center',
    fontSize: 15
  },
  text1:{
    textAlign:'center',
   // backgroundColor: 'blue',
    borderBottomWidth: 5
  }
  })