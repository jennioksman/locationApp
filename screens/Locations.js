import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { StyleSheet, View, ScrollView, Dimensions, Image, SafeAreaView } from 'react-native'
import { Button, Text, TextInput, IconButton } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import { LocationContext } from '../contexts/context'
import { useNavigation } from '@react-navigation/native'
import { useFireLocations } from '../firebase/FirebaseController'
import { styles } from "../styles/Styles"

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