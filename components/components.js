import { StatusBar } from 'expo-status-bar'
import { useState, useContext } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import { DataContext } from '../contexts/context'

export function Locations() {

    const { data } = useContext(DataContext)

    return (
        <View>
            <ScrollView>
                {data.map((item, index) => (
                    <View key={index}>
                        <Text variant="bodyLarge">{`Location: ${item.location}`}</Text>
                        <Text variant="bodyLarge">{`Description: ${item.description}`}</Text>
                        <Rating
                            type='custom'
                            ratingCount={5}
                            startingValue={item.rating} 
                            readonly
                            starContainerStyle={{
                                alignSelf: "center",
                                backgroundColor: "green",
                            }}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export function AddingLocation() {

    const { data, setData } = useContext(DataContext)

    const [location, setLocation] = useState('')
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
                    console.log(location, description, rating)
                    addToList()
                    setLocation('')
                    setDescription('')
                    setRating('')
                }}
            >Save</Button>
        </View>
    )
}

export function MapView() {

    

    return(
        <View>
            <Text variant='headlineMedium'>Maps</Text>
        </View>
    )
}