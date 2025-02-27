import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button, Text } from 'react-native-paper'
import { Locations, AddingLocation, MapScreen, Capitals } from './components/components'
import { Icon } from 'react-native-paper'
import { DataProvider, LocationProvider } from './contexts/context'
import { SafeAreaView } from 'react-native-safe-area-context'
import { addLocation, useFireLocations } from './firebase/FirebaseController'
import { db } from './firebase/firebaseConfig'


export default function App() {

  const Tab = createBottomTabNavigator()

  const LOCATIONS = 'Locations'
  const ADDING = 'Adding Location'
  const MAP = 'Map'
  const CAPITALS = 'Capitals'
   
  return (
    
    <DataProvider>
    <LocationProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerTitleAlign: 'center'
        }}>
          <Tab.Screen
            name={LOCATIONS}
            component={Locations}
            options={{tabBarIcon: ()=> <Icon source={'map-marker'} size={20}/>}}
          />
          <Tab.Screen
            name={ADDING}
            component={AddingLocation}
            options={{tabBarIcon: ()=> <Icon source={'plus-circle'} size={20}/>}}
          />
          <Tab.Screen
            name={MAP}
            component={MapScreen}
            options={{tabBarIcon: ()=> <Icon source={'map'} size={20}/>}}
          />
          <Tab.Screen
            name={CAPITALS}
            component={Capitals}
            options={{tabBarIcon: ()=> <Icon source={'city-variant'} size={20}/>}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </LocationProvider>
  </DataProvider>  
  )
}

