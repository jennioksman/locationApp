import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { Rating } from 'react-native-ratings'

export function Locations() {
    return (
        <View>
            <Text style={{ backgroundColor: 'yellow' }} variant='headlineMedium'>Locations</Text>
        </View>
    )
}

export function AddingLocation() {
    
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState(0)

    return (
        <View>
            <TextInput
                mode='flat'
                label='Location'
                value={location}
                onChangeText={setLocation}
            />
            <TextInput
                mode='flat'
                label='Description'
                value={description}
                onChangeText={setDescription}
            />
            <Rating
                type='custom'
                ratingCount={5}
                rating={rating}
                onFinishRating={setRating}
                starContainerStyle={{
                    alignSelf: "center",
                    backgroundColor: "green",
                }}
            />
            <Button
                mode="contained"
                onPress={() => {
                    console.log(location, description, rating)
                    setLocation('')
                    setDescription('')
                    setRating('')
                      
                }}
            >Save</Button> 
        </View>
    )
}

export function MapView() {
    return (
        <Text variant='headlineMedium'>Maps</Text>
    )
}