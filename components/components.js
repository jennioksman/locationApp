import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

export function Locations(){
    return(
        <View>
            <Text style={{backgroundColor: 'yellow'}} variant='headlineMedium'>Locations</Text>
        </View>
    )
}

export function AddingLocation(){
    return(
        <Text variant='headlineMedium'>Add Location</Text>
    )
}

export function MapView(){
    return(
        <Text variant='headlineMedium'>Maps</Text>
    )
}