import { Text, View, TextInput,Image,StyleSheet,TouchableOpacity} from 'react-native'
import React, { Component } from 'react'


export default class Account extends Component {
  constructor(props){
    super(props)

    this.state = {
      
      id: 8,
      url: "http://127.0.0.1:3333/api/1.0.0/user/",
      First_name:  "",
      last_name: "",
      email: "",
      photo: null,
      isLoading: true
    }
  }
  componentWillMount(){
    console.log(this.state.url + this.state.id)
    this.fetchData();
   
  }
  componentDidMount(){
    this.getPicture();
  }

logout(){
  return fetch("http://127.0.0.1:3333/api/1.0.0/logout",{
    method: 'POST',
    headers: {
       'X-Authorization': 'a21764cda61efb6f144e9b29f4a89310'
    }
    
})
.then((response) => {
  if(response.status === 200){
    return response.json()
  }else if(response.status === 401){
    throw 'Unauthorised';
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
changeEmail(){

}
changeName(){
  
}
getPicture(){
  fetch("http://localhost:3333/api/1.0.0/user/" + this.state.id + "/photo", {
            method: "GET",
            headers: {
                "X-Authorization": "a21764cda61efb6f144e9b29f4a89310"
            }
        })
        .then((res) => {
            return res.blob()
        })
        .then((resBlob) => {
            let data = URL.createObjectURL(resBlob);

            this.setState({
                photo: data,
                isLoading: false
            })
        })
        .catch((err) => {
            console.log(err)
        })
  
}




  render() {
    const data = {
      id: this.state.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email:this.state.email
    }
    return (

      <View>
        <Image source={{ uri: this.state.photo}}
        style={styles.logo} />
        <Text style={styles.text} ><b>ID:</b> {this.state.id} </Text>
        
    
        <Text style={styles.text}><b>First Name: </b> {this.state.First_name}</Text>
        
        <Text style={styles.text}><b>Last Name: </b>{this.state.last_name} </Text>
        
        <Text style={styles.text}><b>Email: </b>{this.state.email} </Text>
       
        <View style={styles.managebuttons}>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this.props.navigation.navigate('Password', {data})}>
            <Text style={styles.button}>
                Change Password 
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this.props.navigation.navigate('Email', {data})}>
            <Text style={styles.button}>
                Change Email
            </Text>
        </TouchableOpacity>
        </View>
        <View style={styles.managebuttons}>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this.props.navigation.navigate('Name', {data})}>
            <Text style={styles.button}>
                Change Name 
            </Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.buttonContainer} 
        
        onPress={() => this.props.navigation.navigate('Camera', {data})}>
            <Text style={styles.button}>
                Change Picture
            </Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => logout()}>
            <Text style={styles.button}>
                Logout 
            </Text>
        </TouchableOpacity>
        </View>

      </View>
      
    )
  }
}
const styles = StyleSheet.create({
  
  logo:{
  alignSelf:'center',
   marginTop: 12,
   width: 100, 
   height: 100,

},
text:{
  alignSelf: 'center',
  fontSize: 20

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
})