import { useEffect, useState } from "react"
import axios from "axios"
import { SafeAreaView, ScrollView, View, Image } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { styles } from "../styles/Styles"


export function Capitals() {

    const [data, setData] = useState([])
    const [country, setCountry] = useState('')
    const [countryName, setCountryName] = useState('')
    const [capital, setCapital] = useState('')
    const [flag, setFlag] = useState('')

    useEffect(() => {
        
        if (countryName && capital && flag) {
            setData(prevData => {
                if (!prevData.some(item => item.countryName === countryName)) {
                    return [...prevData, { countryName, capital, flag }];
                }
                return prevData
            })
        }
    }, [countryName, capital, flag])

    function getData() {
        axios.get(`https://restcountries.com/v3.1/name/${country}`)
            .then(resp => {
                const data = resp.data[0] 
                setCountryName(data.name.common) 
                setCapital(data.capital[0]) 
                setFlag(data.flags.png) 
                setCountry('')
            })
            .catch(error => console.log(error.message))
    }
    return (
        <SafeAreaView style={styles.scroll}>
            <TextInput
                mode='flat'
                label='Search'
                value={country}
                onChangeText={setCountry}
            />
            <Button
                mode='contained'
                onPress={getData}
                >Search</Button>
            <ScrollView>
                {data.map((item, index) => (
                    <View key={index}>
                        <Text variant="bodyLarge">{`Country: ${item.countryName}`}</Text>
                        <Text variant="bodyLarge">{`Capital: ${item.capital}`}</Text>
                        <Image source={{ uri: item.flag }} style={{ width: 100, height: 60 }} />
                    </View>))}
            </ScrollView>
        </SafeAreaView>
    )
}
