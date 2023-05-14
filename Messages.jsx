import { Text, View,FlatList,TextInput,StyleSheet,TouchableOpacity, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { NavigationEvents } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class messages extends Component {
  constructor(props) {
    super(props);
  this.state = {
    item: this.props.route.params.item.chat_id,
    sendMsg: "",
    editedMsg: "",
    Url: "http://127.0.0.1:3333/api/1.0.0/chat/",
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


fetchData = async () => {
  const sesh_token = await AsyncStorage.getItem('@session_token')
 

  const fullURL = this.state.Url + this.state.item
  return fetch(fullURL,{
    method: 'GET',
    headers: {
          
          'X-Authorization': sesh_token
    }
  })
  .then((response) => {
    if(response.status === 200){
      return response.json()
    }
    else{alert("messages could not be found");
     
  }
  })
  .then(async(json) => {
    this.setState({data1: json.messages})
})
}


send = async()=>{
  const sesh_token = await AsyncStorage.getItem('@session_token')
  
  let to_send = {
    message: this.state.sendMsg,
    
    };
    const fullURL = this.state.Url + this.state.item + "/message"
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
  }else{
    alert("Message could not be sent")
}
})
.then(async(json) => {
  console.log(json)
  this.fetchData();
})
}


longPress(item){
    const obj = {
      item : item,
      chat_id: this.state.item
    }
    this.props.navigation.navigate( 'options', {obj})
   
}
  render() {
   const chat_id = this.state.item
   
    return (

  <View> 
    <View>
    <View style={styles.manageButtons} > 
          <TouchableOpacity style={styles.buttonContainer1}  onPress={() => this.props.navigation.navigate('DetailsStack', {screen: 'Details', params: {chat_id}})}><Text style={styles.button1}>Veiw Chat Details </Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer1}  onPress={() => this.props.navigation.navigate('AddUser', {chat_id})}><Text style={styles.button1}>Add Users  </Text></TouchableOpacity>
          </View>
    </View>

        <ScrollView style={styles.Container}>
      <FlatList data ={this.state.data1} 
      keyExtractor={item =>item.message_id }
      renderItem={({item})=>   
     
      <View style={styles.messageBox}>
        <TouchableOpacity onLongPress={() => this.longPress(item)}>

          <Text style={styles.Name}  >  {item.author.last_name}  </Text> 
          <Text style={styles.message} > {item.message}</Text> 
        </TouchableOpacity>
        </View>
      } inverted/>
    </ScrollView>
      <View style={styles.Send}>
        <TextInput placeholder= "Type Message"
        onChangeText={(sendMsg) => this.setState({sendMsg})}
        value= {this.state.sendMsg}/>
        <TouchableOpacity  style={styles.buttonContainer} 
        onPress={() => this.send()}> 
        <Text style={styles.button1}>
                Send
            </Text>
        </TouchableOpacity>
      </View>
    
    </View>
    )
  
  }

}

const styles = StyleSheet.create({
  Container: {
    padding: 20,
  },
  messageBox: {
    borderRadius: 5,
    backgroundColor: '#e5e5e5',
    padding: 10,
    marginBottom: 10,
  },
  Name: {
    color: 'red',
    fontWeight: "bold",
    marginBottom: 5,
  },
  Time: {
    alignSelf: "flex-end",
    color: 'grey'
  },
  Send: {
    margin: 10, 
    height: 30,
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
    flexDirection: 'row'
  },
  buttonContainer: {
    backgroundColor: 'red',
    width: 50,
    height:20,
    marginLeft:150,
    marginTop: 5,
    alignItems: 'center'
  },
  manageButtons:{
    flexDirection: 'row',
    alignSelf: 'center'
   },
   buttonContainer1: {
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
    button1:{
      bottom:0,
      textAlign: 'center',
        
    }

});
