import { StatusBar } from 'expo-status-bar'
import { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import { DataContext, LocationContext } from '../contexts/context'
import { addLocation, useFireLocations } from '../firebase/FirebaseController'
import { styles } from "../styles/Styles"

export function AddingLocation() {

    const locations = useFireLocations()

    const { data, setData } = useContext(DataContext)
    const { location, setLocation } = useContext(LocationContext)

    const [description, setDescription] = useState('')
    const [rating, setRating] = useState(0)

    function addToList() {
        const newLocation = {
            location: location,
            description: description,
            rating: rating
        }
        setData([...data, newLocation])
    }

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
                startingValue={rating}
                onFinishRating={setRating}
                starContainerStyle={{
                    alignSelf: "center",
                    backgroundColor: "green",
                }}
            />
            <Button
                mode="contained"
                onPress={() => {
                    console.log(locations)
                    addToList()
                    addLocation(location, description, rating)
                    setLocation('')
                    setDescription('')
                    setRating('')
                }}
            >Save</Button>
        </View>
    )
}