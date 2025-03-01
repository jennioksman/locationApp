import { useEffect, useState } from "react"
import axios from "axios"
import { SafeAreaView, ScrollView, View, Image } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { styles, Theme } from "../styles/Styles"


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
        <SafeAreaView style={[styles.scroll, styles.container]}>
            <Text style={styles.headline} variant="headlineSmall">Serch Country by name</Text>
            <TextInput
                mode='flat'
                label='Country'
                value={country}
                onChangeText={setCountry}
            />
            <Button
                mode='contained'
                onPress={getData}
                >Search</Button>
            <ScrollView>
                {data.map((item, index) => (
                    <View style={[styles.item, styles.countryView, {backgroundColor: Theme.colors.elevation.level3}]} key={index}>
                        <View style={styles.itemText} key={index}>
                            <Text variant="bodyLarge">{`Country: ${item.countryName}`}</Text>
                            <Text variant="bodyLarge">{`Capital: ${item.capital}`}</Text>
                        </View>
                        <Image style={styles.image} source={{ uri: item.flag }} />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
