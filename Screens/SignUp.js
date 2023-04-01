import { Text, View, StyleSheet,TouchableOpacity,TextInput, Alert } from 'react-native'
import React, { Component } from 'react'
import Logo from '../logo';
import * as EmailValidator from 'email-validator';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        isLoading: true,
        signUpData: [],
         first_name: '',
         last_name: '',
         email: '',
         password: '',
         confirmPass: '',
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
        this.signUp()

    }
    signUp () {
        let to_send = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password
        };
        console.log(to_send)
        return fetch("http://127.0.0.1:3333/api/1.0.0/user",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(to_send)
        })
        .then((response) => {
            alert("Item Added");
        })
        console.log(to_send)
        .catch((error) => {
            console.log(error);
        });
        
      }
  render() {
    return (
    <View style={styles.container}>

        <Logo/>
     <View style={styles.form}>

        <TextInput style={styles.input} 
          placeholder="First Name" 
          onChangeText={(first_name) => this.setState({first_name})}
          value={this.state.first_name} >
        </TextInput>
        

        <TextInput style={styles.input} 
          placeholder="Last Name" 
          onChangeText={(last_name) => this.setState({last_name})}
          value={this.state.last_name} >
        </TextInput>



        <TextInput style={styles.input} 
        placeholder="Email" 
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}
        //placeholderTextColor={'rgba(255,255,255,0.5)'}
        >
        </TextInput>
      

        <TextInput style={styles.input} 
          placeholder="Password" 
          onChangeText={(password) => this.setState({password})}
          value={this.state.password} >
        </TextInput>

        <TextInput style={styles.input} 
          placeholder=" Confirm Password" 
          onChangeText={(confirmPass) => this.setState({confirmPass})}
          value={this.state.confirmPass} >
        </TextInput>

        <TouchableOpacity style={styles.buttonContainer} 
        onPress={this._onPressButton}>
            <Text style={styles.button}>
                SignUp
            </Text>
        </TouchableOpacity> 
            
     </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
    backgroundColor: '#34eb8c',
    flex: 1,
    
    },
    input:{
     width:400,
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
 
    },
     form: {
        paddingTop: 150,
       
  
      }
   
 })