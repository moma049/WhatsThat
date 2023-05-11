import { Text, View,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import React, { Component } from 'react'

export default class ChangeName extends Component {
  constructor(props){
    super(props)

    this.state = {
      
     
      url: "http://127.0.0.1:3333/api/1.0.0/user/",
      data:  this.props.route.params.data,
      First_name:  "",
      last_name: "",
      password:"Tineo1999$",
      
    }
  }
  _onPressButton(){ 

    this.setState({submitted: true})
    this.setState({error: ""})

    if(!(this.state.First_name && this.state.last_name)){
        this.setState({error: "Must enter First and Last name"})
        alert("Must enter First and Last Name")
        return;
    }

    

    console.log("Button clicked: " + this.state.First_name + " " + this.state.last_name)
    console.log("Validated and ready to send to the API");
    this.changeName();
   
}
  
  changeName = async () => {
    let to_send = {
      first_name:this.state.First_name,
      last_name:this.state.last_name,
      email: this.state.data.email,
      password: this.state.password
      };
      const url1 = this.state.url + this.state.data.id
      console.log(to_send)
    return fetch(url1,{
      method: 'PATCH',
      headers: {
        'X-Authorization': 'a21764cda61efb6f144e9b29f4a89310',
        'Content-Type': 'application/json'
        
      },
      body: JSON.stringify(to_send)
        
    })
    .then((response) => {
      if(response.status === 200){
        return response
      }else if(response.status === 400){
        throw 'Bad Request';
      }else{
        throw 'Something went wrong';
    }
    })
    .then(async(json) => {
      console.log(json)
      
  })
  }
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.container1}>
        <Text><b>First Name:</b> </Text>
        <TextInput style={styles.input} 
          placeholder="Enter First Name" 
          onChangeText={(First_name) => this.setState({First_name})}
        value={this.state.First_name}
           >
        </TextInput>
         </View>
         <View style={styles.container1}>
        <Text><b>Last Name:</b> </Text>
        <TextInput style={styles.input} 
          placeholder="Enter Last Name" 
          onChangeText={(last_name) => this.setState({last_name})}
        value={this.state.last_name}
           >
        </TextInput>
        </View>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this._onPressButton()}>
            <Text style={styles.button}>
                CONFIRM
            </Text>
        </TouchableOpacity>
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
  main:{
    flex:1
  },
  container1 : {
    marginTop:30,
    alignSelf:'center',
    flexDirection: 'row',
   

  },
input: {
  borderWidth:2,
  Height:30,
  width:150,
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
 },button:{
  //position: 'relative',
    bottom:0,
    textAlign: 'center',
    
}})