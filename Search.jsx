import { Text, View,TextInput,Picker,StyleSheet,TouchableOpacity,FlatList} from 'react-native'
import React, { Component } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Search extends Component {
  constructor(props){
    super(props)

    this.state = {
      
      Url: "http://127.0.0.1:3333/api/1.0.0/search?q=",
      endUrl:"&offset=0",
      filterURL: "&search_in=",
      firstName:  "",
      lastName: "",
      Email: "",
      Search: '',
      Data1: [],
      open: false,
      value: null,
      items: [{label: 'My Contacts', value: 'contacts' },{label:'All Users', value:'all'}]
      
    } 
    this.setValue = this.setValue.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }
  setOpen(open) {
    this.setState({
      open
    });
  }

  setValue(callback) {
    this.setState(state => ({
      value: callback(state.value)
    }));
  }

  setItems(callback) {
    this.setState(state => ({
      items: callback(state.items)
    }));

  }
  updateUser = (dropdown) =>{
    this.setState({dropdown:dropdown})
  }

  fetchData = async () => {
    const sesh_token = await AsyncStorage.getItem('@session_token')
   
    const url1 = this.state.Url + this.state.Search + this.state.filterURL + this.state.value
    console.log(url1)
    return fetch(url1,{
        method: 'GET',
        headers: {
           'X-Authorization':sesh_token
        }
        
    })
    .then((response) => {
      if(response.status === 200){
        return response.json()
      }else{
        alert('Please try again later');
    }
    })
    .then(async(json) => {
      this.setState({Data1: json})
  })
  }

  OnPressButton(){
    if(!(this.state.Search)){
      alert("Must enter search")
      return;
  }
  if(!(this.state.value)){
    alert("Pick an item from the Dropdown")
    return;
}
this.fetchData()
this.render()
  }
  render() {    
     const { open: open, value: value, items: items } = this.state;
    return (
      
      <View>
  
       <TextInput 
        placeholder= "Search"
        onChangeText={(Search) => this.setState({Search})}
        value= {this.state.Search}
        style={styles.searchInput}
        />
     
        <View>
        <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={this.setOpen}
        setValue={this.setValue}
        setItems={this.setItems}
      />
      <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => this.OnPressButton()}>
            <Text style={styles.Button}>
                SEARCH
            </Text>
        </TouchableOpacity>

        <FlatList data ={this.state.Data1} 
        keyExtractor={item =>item.user_id }
        renderItem={({item})=>
        <View style={styles.Text1}>

          <Text > {<b>ID: </b>}{item.user_id}{"\n"} {<b>Name:</b>} {item.given_name} {item.family_name} {"\n"} {<b>Email:</b>} {item.email}</Text> 
  
          </View>
        }/>
        </View>

        
      </View>
      

    )
  }
}
const styles = StyleSheet.create({
Drop:{
  alignSelf: 'center',
  width: 400, 
  height: 50,
},
searchInput: {
  borderWidth:1,
  height: 50,
  paddingLeft:20,
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
  borderTopRightRadius: 20,  
  borderBottomRightRadius: 20,
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
Text1:{
  textAlign:'center',
  borderBottomWidth: 5
},
})