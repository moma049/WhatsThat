import { Text, View,FlatList,TextInput,StyleSheet,TouchableOpacity, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { NavigationEvents } from '@react-navigation/native';

export default class messages extends Component {
  constructor(props) {
    super(props);
  this.state = {
   item: this.props.route.params.item.chat_id,
  
    sendmsg: "",
    editedmsg: "",
    url: "http://127.0.0.1:3333/api/1.0.0/chat/",
  
    
   
  };
  this.fetchData = this.fetchData.bind(this)
}

 componentWillMount(){
  this.fetchData();
 
    console.log("Hiiiii" + this.state.item)
    this.fetchData();

}
componentDidMount(){
  this.focusListener = this.props.navigation.addListener('didFocus', () => {
    this.fetchData();
    this.render()
   
  });
}
fetchData = async () => {
  const fullURL = this.state.url + this.state.item
  return fetch(fullURL,{
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
    console.log(json),
    this.setState({data1: json.messages})
})
}
send(){
  let to_send = {
    message: this.state.sendmsg,
    
    };
    const fullURL = this.state.url + this.state.item + "/message"
  return fetch(fullURL,{
    method: 'POST',
    headers: {
       'X-Authorization': 'a21764cda61efb6f144e9b29f4a89310',
       'Content-Type': 'application/json'
    },
    body: JSON.stringify(to_send)
    
})
.then((response) => {
  if(response.status === 200){
    return response
  }else if(response.status === 401){
    throw 'Unauthorised';
  }else{
    throw 'Something went wrong';
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
    this.props.navigation.navigate('options', {obj})
   
}
  render() {
   const chat_id = this.state.item
   
    return (

  <View> 
    <View>
    <View style={styles.managebuttons} > 
          <TouchableOpacity style={styles.buttonContainer1}  onPress={() => this.props.navigation.navigate('DetailsStack', {screen: 'Details', params: {chat_id}})}><Text style={styles.button1}>Veiw Chat Details </Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer1}  onPress={() => this.props.navigation.navigate('AddUser', {chat_id})}><Text style={styles.button1}>Add Users  </Text></TouchableOpacity>
          </View>
    </View>

        <ScrollView style={styles.container}>
      <FlatList data ={this.state.data1} 
      keyExtractor={item =>item.message_id }
      renderItem={({item})=>   
     
      <View style={styles.messageBox}>
        <TouchableOpacity onLongPress={() => this.longPress(item)}>

          <Text style={styles.name}  >  {item.author.last_name}  </Text> 
          <Text style={styles.message} > {item.message}</Text> 
        </TouchableOpacity>
        </View>
      } inverted/>
    </ScrollView>
      <View style={styles.send}>
        <TextInput placeholder= "Type Message"
        onChangeText={(sendmsg) => this.setState({sendmsg})}
        value= {this.state.sendmsg}/>
        <TouchableOpacity  style={styles.buttonContainer} 
        onPress={() => this.send()}> 
        <Text style={styles.button}>
                Send
            </Text>
        </TouchableOpacity>
      </View>
    
    </View>
    )
  
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  messageBox: {
    borderRadius: 5,
    backgroundColor: '#e5e5e5',
    padding: 10,
    marginBottom: 10,
  },
  name: {
    color: 'red',
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {

  },
  time: {
    alignSelf: "flex-end",
    color: 'grey'
  },
  send: {
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
  managebuttons:{
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
      //position: 'relative',
        bottom:0,
        textAlign: 'center',
        
    }

});
