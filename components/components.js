import { StatusBar } from 'expo-status-bar'
import { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Dimensions, Image, SafeAreaView } from 'react-native'
import { Button, Text, TextInput, IconButton } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'
import { DataContext, LocationContext } from '../contexts/context'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { addLocation, useFireLocations } from '../firebase/FirebaseController'









