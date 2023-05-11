import { Text, View,TextInput,Picker,StyleSheet,TouchableOpacity,FlatList} from 'react-native'
import React, { Component } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import DropDownPicker from 'react-native-dropdown-picker';

export default class Search extends Component {
  constructor(props){
    super(props)

    this.state = {
      
      url: "http://127.0.0.1:3333/api/1.0.0/search?q=",
      endurl:"&offset=0",
      filterURL: "&search_in=",
      First_name:  "",
      last_name: "",
      email: "",
      search: '',
      data1: [],
   

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
    const url1 = this.state.url + this.state.search + this.state.filterURL + this.state.value
    console.log(url1)
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
      this.setState({data1: json})
  })
  }

  OnPressButton(){
    if(!(this.state.search)){
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
     const { open, value, items } = this.state;
    return (
      
      <View>
  
       <TextInput 
        placeholder= "Search"
        onChangeText={(search) => this.setState({search})}
        value= {this.state.search}
        style={styles.searchinput}
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
            <Text style={styles.button}>
                SEARCH
            </Text>
        </TouchableOpacity>


        <FlatList data ={this.state.data1} 
        keyExtractor={item =>item.user_id }
        renderItem={({item})=>
        <View style={styles.text1}>

          <Text > {<b>ID: </b>}{item.user_id}{"\n"} {<b>Name:</b>} {item.given_name} {item.family_name} {"\n"} {<b>Email:</b>} {item.email}</Text> 
          
          
          
          </View>
        }/>
        </View>

        
      </View>
      

    )
  }
}
const styles = StyleSheet.create({
  
  drop:{
  alignSelf: 'center',
   width: 400, 
   height: 50,

},
searchinput: {
  //borderBottomWidth:1,
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
 button:{
  textAlign: 'center',
  fontWeight: 500,
  color: 'black'

 },
 text1:{
  textAlign:'center',
  borderBottomWidth: 5
},
})