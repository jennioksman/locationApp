import { StatusBar } from 'expo-status-bar'
import { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'
import { DataContext, LocationContext } from '../contexts/context'


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
    const {location, setLocation} = useContext(LocationContext)

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

export function MapScreen() {
    const { location } = useContext(LocationContext)

    const [latitude, setLatitude] = useState(0)
    const [longnitude, setLongnitude] = useState(0)

    useEffect(() => {
        getLocation()
        async function getLocation() {

            let {status} = await Location.requestForegroundPermissionsAsync()
            if(status !=='granted'){
                console.log('No permission')
                return  
            }
    
            const place = await Location.geocodeAsync(location)
            setLatitude(place[0].latitude)
            setLongnitude(place[0].longitude)   
        } 
    },[location]
)
    return(
        <View style={styles.container}>
            <Text variant='headlineSmall'>{latitude}</Text>
            <Text variant='headlineSmall'>{longnitude}</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 65.0800,
                    longitude: 25.4800,
                    latitudeDelta: 0.0922,  
                    longitudeDelta: 0.0421
                }}
                region={{
                    latitude: latitude,
                    longitude: longnitude,
                    latitudeDelta: 0.0922,  
                    longitudeDelta: 0.0421
                }}
            />
        </View>
)
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
  })
  