import { View, Text, Button, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

const index = () => {

    const [image, setImage] = useState<string | null>(null)

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
            <Text>index</Text>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    )
}

export default index