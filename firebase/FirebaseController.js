
import { addDoc, collection, getDoc, getDocs, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db, LOCATION_REF } from "./firebaseConfig"

export function useFireLocations(){
    const [locations, setLocations] = useState([])

    useEffect(()=>{

       const q = query(collection(db, LOCATION_REF))

       onSnapshot(q, querySnapshot => {
        setLocations(querySnapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()}  
       }))
    })
    }, [])

    return locations  
}

export function addLocation(location, description, rating){
    addDoc(collection(db, LOCATION_REF), {location, description, rating})
        .catch(error => console.log(error.message))
}

export function getLocations(location, description, rating){
    getDocs(collection(db, LOCATION_REF), {location, description, rating})
        .catch(error => console.log(error.message))
}