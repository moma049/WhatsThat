import { Text, View, StyleSheet,TextInput,TouchableOpacity,KeyboardAvoidingView,Alert,Image} from 'react-native'
import React, { Component } from 'react'
import * as EmailValidator from 'email-validator';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class LoginForm extends Component {


  constructor(props) {
    
    super(props);
    this.state = {
    isLoading: true,
    signUpData: [],
     email: '',
     password: '',
     error: "", 
    submitted: false};
    
     this._onPressButton = this._onPressButton.bind(this)
}


  _onPressButton(){ 

    this.setState({submitted: true})
    this.setState({error: ""})

    if(!(this.state.email && this.state.password)){
        this.setState({error: "Must enter email and password"})
        alert("Must enter email and password")
        return;
    }

    if(!EmailValidator.validate(this.state.email)){
        this.setState({error: "Must enter valid email"})
        alert("Must enter valid email")
        return;
    }

    const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    if(!PASSWORD_REGEX.test(this.state.password)){
        this.setState({error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)"})
        alert("Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)")
        return;
    }


    console.log("Button clicked: " + this.state.email + " " + this.state.password)
    console.log("Validated and ready to send to the API");
    this.login();
   
}
login = async () => {
  await AsyncStorage.setItem('@session_password', this.state.password);

  let to_send = {
  email: this.state.email,
  password: this.state.password
  };
  console.log(to_send)
  return fetch("http://127.0.0.1:3333/api/1.0.0/login",{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(to_send)
  })
  .then(async (response) => {
    if(response.status === 200){
     return response.json()
    }else if(response.status === 400){
      alert('Invalid email or password');
      return
    }else{
      alert("cannot Login")
  }
  })
  .then(async (json) => {
     
      await AsyncStorage.setItem('@session_token', json.token);
      await AsyncStorage.setItem('@session_id', json.id);
      const value = await AsyncStorage.getItem('@session_token');
      console.log(value)
      
    this.props.navigation.navigate('MainApp')
})
}

  render() {
    
    return (
      
      <KeyboardAvoidingView behavior='padding' style={styles.container1}>
         <Image
        source={require('../assets/logo1.png')}
        style={styles.logo}
        />
        <TextInput style={styles.input} 
        placeholder="Username" 
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}
        >

        </TextInput>
        <TextInput style={styles.input} 
          placeholder="Password" 
          onChangeText={(password) => this.setState({password})}
          value={this.state.password} 
        >
        </TextInput>

        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this._onPressButton()}
        >
            <Text style={styles.button}>
                LOGIN
            </Text>
            
        </TouchableOpacity>

      </KeyboardAvoidingView>
    )
  }
  
}

const styles = StyleSheet.create({
   container1 : {
    padding:20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#34eb8c',
   },
   logo:{
    width: 200, 
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',

},
   input:{
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginBottom:20,
    color: 'black',
   },
   buttonContainer: {
    backgroundColor: 'red',
    paddingVertical: 15,
   },
   button:{
    textAlign: 'center',
    fontWeight: 500,
    color: 'black'

   }
  
})
