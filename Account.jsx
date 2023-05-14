import { Text, View, TextInput,Image,StyleSheet,TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Account extends Component {
  constructor(props){
    super(props)

    this.state = {
      
      
      Url: "http://127.0.0.1:3333/api/1.0.0/user/",
      firstName:  "",
      lastName: "",
      Email: "",
      Photo: null,
      isLoading: true,
    }
  }
  componentWillMount(){
    this.fetchData();
   
  }

  componentDidMount = () => { 
   
    this.myTime = setInterval(()=>{
      this.fetchData();
      this.getPicture();
      
    }, 5000)
  }

  componentWillUnmount = () =>{
    clearInterval(this.myTime);
  }

logout=async() =>{
  const sesh_token = await AsyncStorage.getItem('@session_token')


  return fetch("http://127.0.0.1:3333/api/1.0.0/logout",{
    method: 'POST',
    headers: {
       'X-Authorization': sesh_token
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
  this.setState({firstName: json.first_name})
  this.setState({lastName: json.last_name})
  this.setState({email: json.email})
})
}
  
fetchData = async () => {
  const sesh_token = await AsyncStorage.getItem('@session_token')
  const Id = await AsyncStorage.getItem('@session_id')

  const Url1 = this.state.Url + Id
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
      console.log(response)
      alert("Could not get data");
  }
  })
  .then(async(json) => {
    this.setState({firstName: json.first_name})
    this.setState({lastName: json.last_name})
    this.setState({Email: json.email})
})
}

getPicture = async()=>{
  const sesh_token = await AsyncStorage.getItem('@session_token')
  const Id = await AsyncStorage.getItem('@session_id')

  fetch("http://localhost:3333/api/1.0.0/user/" + Id + "/photo", {
            method: "GET",
            headers: {
                "X-Authorization": sesh_token
            }
        })
        .then((res) => {
            return res.blob()
        })
        .then((resBlob) => {
            let data = URL.createObjectURL(resBlob);

            this.setState({
                Photo: data,
                isLoading: false
            })
        })
        .catch((err) => {
            console.log(err)
        })
  
}



  render() {
    const data = {
      Id: this.state.Id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      Email:this.state.Email
    }
    return (

      <View>
        <Image source={{ uri: this.state.Photo}}
        style={styles.Logo} />
        <Text style={styles.Text} ><b>ID:</b> {this.state.Id} </Text>
        
    
        <Text style={styles.Text}><b>First Name: </b> {this.state.firstName}</Text>
        
        <Text style={styles.Text}><b>Last Name: </b>{this.state.lastName} </Text>
        
        <Text style={styles.Text}><b>Email: </b>{this.state.Email} </Text>
       
        <View style={styles.manageButtons}>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this.props.navigation.navigate('Password', {data})}>
            <Text style={styles.Button}>
                Change Password 
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this.props.navigation.navigate('Email', {data})}>
            <Text style={styles.Button}>
                Change Email
            </Text>
        </TouchableOpacity>
        </View>
        <View style={styles.manageButtons}>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this.props.navigation.navigate('Name', {data})}>
            <Text style={styles.Button}>
                Change Name 
            </Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.buttonContainer} 
        
        onPress={() => this.props.navigation.navigate('Camera', {data})}>
            <Text style={styles.Button}>
                Change Picture
            </Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => logout()}>
            <Text style={styles.Button}>
                Logout 
            </Text>
        </TouchableOpacity>
        </View>

      </View>
      
    )
  }
}
const styles = StyleSheet.create({
  
Logo:{
  alignSelf:'center',
  marginTop: 12,
  width: 100, 
  height: 100,

},
Text:{
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
 manageButtons:{
  flexDirection: 'row',
  alignSelf: 'center'
 },
 Button:{
    bottom:0,
    textAlign: 'center',
    
},
})