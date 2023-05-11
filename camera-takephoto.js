import { Camera, CameraType, onCameraReady, CameraPictureOptions } from 'expo-camera';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CameraTakePicture() {
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = useState();
    const [camera, setCamera] = useState(null);
    const navigation = useNavigation();
    
    useEffect(() => {
        (async () => {
          const cameraPermission = await Camera.requestCameraPermissionsAsync();
       
          setHasCameraPermission(cameraPermission.status === "granted");
          
        })();
      }, []);

    function toggleCameraType(){
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
        console.log("Camera: ", type)
    }

    async function takePhoto(){
        if(camera){
            const options = {quality: 0.5, base64: true}
            const data = await camera.takePictureAsync(options)
            sendToServer(data)
            navigation.navigate('Account')
        }
      
    }

    async function sendToServer(data){
        console.log("HERE", data.uri)

        let id = 8;
        let token = "token here";

        let res = await fetch(data.base64);
        let blob = await res.blob()

        return fetch("http://127.0.0.1:3333/api/1.0.0/user/" + id + "/photo",{
    method: 'POST',
    headers: {
        "Content-Type": "image/png",
       'X-Authorization': 'a21764cda61efb6f144e9b29f4a89310'
    },
    body: blob
    
    })
    .then((response) => {
     if(response.status === 200){
       return console.log("Picture added")

     }else if(response.status === 401){
        throw 'Unauthorised';
     }else{
    throw 'Something went wrong';
    }
    })
   
    }

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
      } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
      }else{
        return (
            <View style={styles.container}>
                <Camera style={styles.camera} type={type} ref={ref => setCamera(ref)}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={takePhoto}>
                            <Text style={styles.text}>Take Photo</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }  
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        padding: 5,
        margin: 5,
        backgroundColor: 'steelblue'
    },
    button: {
        width: '100%',
        height: '100%'
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ddd'
    }
})

