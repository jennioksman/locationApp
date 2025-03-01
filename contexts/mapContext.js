import React, { createContext, useState } from 'react'


export const MapContext = createContext()

export const MapProvider = ({ children }) => {
  const [locationOnMap, setLocationOnMap] = useState([])

  return (
    <MapContext.Provider value={{ locationOnMap, setLocationOnMap }}>
      {children}
    </MapContext.Provider>
  )
}