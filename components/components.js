import { StatusBar } from 'expo-status-bar'
import { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native'
import { Button, Text, TextInput, IconButton } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'
import { DataContext, LocationContext } from '../contexts/context'
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import axios from 'axios'


export function Locations() {

    const { data } = useContext(DataContext)

    const navigation = useNavigation()

    return (
        <View>
            <ScrollView>
                {data.map((item, index) => (
                    <View key={index}>
                        <Text variant="bodyLarge">{`Location: ${item.location}`}</Text>
                        <Text variant="bodyLarge">{`Description: ${item.description}`}</Text>
                        <IconButton
                            icon="map-marker"
                            size={40}
                            onPress={() => navigation.navigate('Map')}
                        />
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

            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.log('No permission')
                return
            }

            const place = await Location.geocodeAsync(location)
            setLatitude(place[0].latitude)
            setLongnitude(place[0].longitude)
        }
    }, [location]
    )
    return (
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


export function Capitals(){

    const [country, setCountry] = useState('')
    const [countryName, setCountryName]= useState('')
    const [capital, setCapital] = useState('')
    const [flag, setFlag] = useState('')

    function getData(){
        axios.get(`https://restcountries.com/v3.1/name/${country}`)
            .then(resp => {
                const data = resp.data[0] // Hakee ensimmäisen maan tuloksista
                setCountryName(data.name.common) // Maan nimi (esim. "Finland")
                setCapital(data.capital[0]) // Pääkaupunki (esim. "Helsinki")
                setFlag(data.flags.png) // Lipun URL (PNG-muodossa)
            })
            .catch(error => console.log(error.message))
    }

    return(
        <View>
            <TextInput
                mode='flat'
                label='Search'
                value={country}
                onChangeText={setCountry}
            />
            <Button
                mode='contained'
                onPress={getData}
            >Search</Button>
            <Text>{countryName}</Text>
            <Text>{capital}</Text>
            <Image source={{ uri: flag }} style={{ width: 100, height: 60 }} />
        </View>

    )
}

export function Login(){
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
        <View>
            <TextInput
                mode='flat'
                label='email'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                mode='flat'
                label='email'
                value={password}
                onChangeText={setPassword}
            />
            <Button
                mode="contained"
                onPress={() => {
                    
                }}
            >Login</Button>
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
