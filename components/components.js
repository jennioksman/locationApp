import { StatusBar } from 'expo-status-bar'
import { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Dimensions, Image, SafeAreaView } from 'react-native'
import { Button, Text, TextInput, IconButton } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'
import { DataContext, LocationContext } from '../contexts/context'
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import axios from 'axios'
import { addLocation, useFireLocations } from '../firebase/FirebaseController'


export function Locations() {

    const { setLocation } = useContext(LocationContext)

    const navigation = useNavigation()

    const locations = useFireLocations()

    return (
        <View>
            <ScrollView>
                {locations.map((item, index) => (
                    <View key={index}>
                        <Text variant="bodyLarge">{`Location: ${item.location}`}</Text>
                        <Text variant="bodyLarge">{`Description: ${item.description}`}</Text>
                        <IconButton
                            icon="map-marker"
                            size={40}
                            onPress={() => {
                                setLocation(item.location)  
                                navigation.navigate('Map')  
                            }}
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

export function MapScreen() {

    const { location } = useContext(LocationContext)

    const [latitude, setLatitude] = useState(65.0120888)
    const [longnitude, setLongnitude] = useState(25.465077299999997)

    useEffect(() => {

        async function getLocation() {

            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.log('No permission')
                return
            }
            const place = await Location.geocodeAsync(location)
            setLatitude(place[0].latitude)
            setLongnitude(place[0].longitude)
            console.log(latitude, longnitude);    
        }
        getLocation()
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

export function Capitals() {

    const [data, setData] = useState([])
    const [country, setCountry] = useState('')
    const [countryName, setCountryName] = useState('')
    const [capital, setCapital] = useState('')
    const [flag, setFlag] = useState('')
    useEffect(() => {
        
        if (countryName && capital && flag) {
            setData(prevData => {
                if (!prevData.some(item => item.countryName === countryName)) {
                    return [...prevData, { countryName, capital, flag }];
                }
                return prevData
            })
        }
    }, [countryName, capital, flag])

    function getData() {
        axios.get(`https://restcountries.com/v3.1/name/${country}`)
            .then(resp => {
                const data = resp.data[0] 
                setCountryName(data.name.common) 
                setCapital(data.capital[0]) 
                setFlag(data.flags.png) 
                setCountry('')
            })
            .catch(error => console.log(error.message))
    }
    return (
        <SafeAreaView style={styles.scroll}>
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
            <ScrollView >
                {data.map((item, index) => (
                    <View key={index}>
                        <Text variant="bodyLarge">{`Country: ${item.countryName}`}</Text>
                        <Text variant="bodyLarge">{`Capital: ${item.capital}`}</Text>
                        <Image source={{ uri: item.flag }} style={{ width: 100, height: 60 }} />
                    </View>))}
            </ScrollView>
        </SafeAreaView>
    )
}

export function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
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
    },
    scroll: {
        marginBottom: 100
    }
})
