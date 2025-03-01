import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { StyleSheet, View, ScrollView, Dimensions, Image, SafeAreaView } from 'react-native'
import { Button, Text, TextInput, IconButton } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import { LocationContext } from '../contexts/context'
import { useNavigation } from '@react-navigation/native'
import { useFireLocations } from '../firebase/FirebaseController'
import { styles, Theme } from "../styles/Styles"
import { UserLocationContext } from '../contexts/UserLocationsContext'

export function Locations() {

    const { setLocation } = useContext(LocationContext)

    const navigation = useNavigation()

    const locations = useContext(UserLocationContext)

    return (
        <View style={styles.container}>
            <Text style={styles.headline} variant='headlineMedium'>Your Locations</Text>
            <ScrollView>
                {locations.map((item, index) => (
                    <View style={[styles.item,{backgroundColor: Theme.colors.elevation.level3}]} key={index}>
                        
                        <View style={styles.itemView}>

                            <View >
                                <Text variant="headlineSmall">{item.location}</Text>
                                <Text variant="bodyLarge">{item.description}</Text>
                            </View>
                            <IconButton
                                style={styles.mapIcon}
                                icon="map-marker"
                                size={40}
                                onPress={() => {
                                    setLocation(item.location)  
                                    navigation.navigate('Map')  
                                }}
                            />
                        </View>
                        <Rating
                            type='custom'
                            ratingColor={Theme.colors.primary}
                            tintColor={Theme.colors.elevation.level3}
                            ratingCount={5}
                            startingValue={item.rating}
                            readonly
                            starContainerStyle={{
                                alignSelf: "center",
                                backgroundColor: '#e7edda'
                            }}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}