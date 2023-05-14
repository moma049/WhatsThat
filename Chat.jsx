import { Text, Touchable, View ,FlatList,StyleSheet,TouchableOpacity,TextInput} from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class Chat extends Component {
  constructor(props) {
    super(props);
  this.state = {
    Name: '',
    Url: "http://127.0.0.1:3333/api/1.0.0/chat",
    Data1: [],
    chatId: null
  };

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
  
  NewChat = async()=>{
    const sesh_token = await AsyncStorage.getItem('@session_token')
    
    let to_send = {
      name: this.state.Name,
      };
      
      return fetch("http://127.0.0.1:3333/api/1.0.0/chat",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sesh_token
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
      
        this.fetchData();
        this.render()
    })
    }
  
  fetchData = async()=> {
    const sesh_token = await AsyncStorage.getItem('@session_token')
  
    const Url1 = this.state.Url 
     return fetch(Url1,{
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
  }) .then(async(json) => {
   
    this.setState({Data1: json})
})
  
  }
  render() {
   
    return (
   
      <View>
        <TextInput placeholder= "Enter Chat Name Here"
        onChangeText={(Name) => this.setState({Name})}
        value= {this.state.Name}
        />
        <TouchableOpacity  style={styles.buttonContainer}  onPress={() => this.NewChat()}>
        <Text style={styles.Button}>
                Create New Chat 
            </Text>
        </TouchableOpacity>

          <FlatList data ={this.state.Data1} 
        keyExtractor={item =>item.chat_id }
        renderItem={({item})=>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('MessageStack',{screen : 'messages', params: {item}})}>
        <View style={styles.Text1}>

          <Text > {<b>ID: </b>}{item.chat_id}{"\n"} {<b>Name:</b>} {item.name}{"\n"} {<b> Last Message:</b>} {item.last_message.message} </Text> 
           
        
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
  Text1:{
    textAlign:'center',
    borderBottomWidth: 5
  },
  buttonContainer: {
    backgroundColor: 'red',
    paddingVertical: 15,
   },
   Button:{
    textAlign: 'center',
    fontWeight: 500,
    color: 'black'
  
   },
})