import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon, IconButton } from 'react-native-paper'
import { DataProvider, LocationProvider } from './contexts/context'
import { Login } from './screens/Login'
import { Locations } from './screens/Locations'
import { AddingLocation } from './screens/AddingLocations'
import { MapScreen } from './screens/MapScreen'
import { Capitals } from './screens/Capitals'
import { logoutUser, useFireAuth } from './firebase/FirebaseAuthController'
import { UserContext } from './contexts/userContext'
import { useContext } from 'react'
import { UserLocationContext } from './contexts/UserLocationsContext'


export default function App() {

  const [user, locations] = useFireAuth()

  return (
    <UserLocationContext.Provider value={locations}>
      <UserContext.Provider value={user}>
        <DataProvider>
          <LocationProvider>
            <NavigationContainer>
              {user ? <Navigation /> : <Login />}
            </NavigationContainer>
          </LocationProvider>
        </DataProvider>
      </UserContext.Provider>
    </UserLocationContext.Provider>
  )
}

function Navigation() {

  const Tab = createBottomTabNavigator()

  const LOCATIONS = 'Locations'
  const ADDING = 'Adding Location'
  const MAP = 'Map'
  const CAPITALS = 'Capitals'
  const user = useContext(UserContext)

  return (
    <Tab.Navigator screenOptions={{
      headerTitle: user.email,
      headerTitleAlign: 'center',
      headerRight: () => <IconButton icon={'logout'} onPress={logoutUser} />
    }}>
      <Tab.Screen
        name={LOCATIONS}
        component={Locations}
        options={{ 
          tabBarIcon: () => <Icon source={'map-marker'} size={20} /> }}
      />
      <Tab.Screen
        name={ADDING}
        component={AddingLocation}
        options={{ tabBarIcon: () => <Icon source={'plus-circle'} size={20} /> }}
      />
      <Tab.Screen
        name={MAP}
        component={MapScreen}
        options={{ tabBarIcon: () => <Icon source={'map'} size={20} /> }}
      />
      <Tab.Screen
        name={CAPITALS}
        component={Capitals}
        options={{ tabBarIcon: () => <Icon source={'city-variant'} size={20} /> }}
      />
    </Tab.Navigator>

  )
}

