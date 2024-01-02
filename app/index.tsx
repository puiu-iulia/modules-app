import { View, Text, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useMMKVString } from 'react-native-mmkv';
import { hello } from '../modules/galaxies';

const index = () => {

    const [image, setImage] = useState<string | null>(null)
    const [username, setUsername] = useMMKVString('user.name')

    useEffect(() => {
        const sayHello = () => {
            const response = hello()
            console.log(response)
        }
        sayHello()
    }
    , [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      }

    return (
        <View>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Text>Username: {username}</Text>
            <Button title="setUsername" onPress={() => setUsername('John Doe')} />
        </View>
    )
}

export default index