import React, { createContext, useState } from 'react'

export const LocationContext = createContext()

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState([])

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