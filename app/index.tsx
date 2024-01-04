import { View, Text, Button, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useMMKVString } from 'react-native-mmkv';
import { getDeviceInfo, loadDummyUser, addDataListener, GalaxiesView } from '../modules/galaxies';

const index = () => {

    const [image, setImage] = useState<string | null>(null);
    const [username, setUsername] = useMMKVString('user.name');
    const [deviceModel, setDeviceModel] = useState<string | null>(null);
    const [appVersion, setAppVersion] = useState<string | null>(null);

    useEffect(() => {
        const info = getDeviceInfo();
        setDeviceModel(info.deviceModel);
        setAppVersion(info.appVersion);
    }, [])

    useEffect(() => {
        const subscription = addDataListener((value: {data: any}) => {
          console.log('Data received: ', value);
          Alert.alert('User loaded', JSON.stringify(value.data.name));
        });

        return () => {
            subscription.remove();
        }
    }, [])
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
            <Text>Device Model: {deviceModel}</Text>
            <Text>App Version: {appVersion}</Text>
            <Button title="Load Dummy User" onPress={loadDummyUser} />
            <GalaxiesView 
              name="John Doe"
              style={{ width: 200, height: 200 }}
            />
        </View>
    )
}

export default index