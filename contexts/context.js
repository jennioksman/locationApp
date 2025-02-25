import React, { createContext, useState } from 'react'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([])

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  )
}

export const LocationContext = createContext()

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState('')

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export const MapContext = createContext()

export const MapProvider = ({ children }) => {
  const [locationOnMap, setLocationOnMap] = useState([])

  return (
    <MapContext.Provider value={{ locationOnMap, setLocationOnMap }}>
      {children}
    </MapContext.Provider>
  )
}