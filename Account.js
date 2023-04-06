import { Text, View, TextInput} from 'react-native'
import React, { Component } from 'react'

export default class Account extends Component {
  constructor(props){
    super(props)

    this.state = {
      
      id: 8,
      url: "http://127.0.0.1:3333/api/1.0.0/user/",
      First_name:  "",
      last_name: "",
      email: ""
    }
  }
  componentWillMount(){
    console.log(this.state.url + this.state.id)
    this.fetchData();
  }
fetchData = async () => {
  const url1 = this.state.url + this.state.id
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
    this.setState({First_name: json.first_name})
    this.setState({last_name: json.last_name})
    this.setState({email: json.email})
})
}


  render() {
    return (
      <View>
        <Text>ID: </Text>
        <TextInput  
        placeholder= "ID"
        value= {this.state.id}
        />
        <Text>First Name: </Text>
        <TextInput  
        placeholder= "First_name"
        value= {this.state.First_name}
        />
        <Text>Last Name: </Text>
        <TextInput  
        placeholder= "last_name"
        value= {this.state.last_name}
        />
        <Text>Email: </Text>
        <TextInput  
        placeholder= "email"
        value= {this.state.email}
        />
        
      </View>
      
    )
  }
}