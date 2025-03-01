import { useEffect, useState } from "react"
import axios from "axios"
import { SafeAreaView, ScrollView, View, Image } from "react-native"
import { Button, Modal, Portal, Searchbar, Text, TextInput } from "react-native-paper"
import { styles, Theme } from "../styles/Styles"


export function Capitals() {

    const [data, setData] = useState([])
    const [country, setCountry] = useState('')
    const [countryName, setCountryName] = useState('')
    const [capital, setCapital] = useState('')
    const [flag, setFlag] = useState('')

    const [alert, setAlert] = useState()
    const [visible, setVisible] = useState(false)

    const showModal = () => setVisible(true)
    const hideModal = () => setVisible(false)


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

    useEffect(() => {
        if (alert) {
            showModal()
        }
    }, [alert])

    function getData() {
        axios.get(`https://restcountries.com/v3.1/name/${country}`)
            .then(resp => {
                const data = resp.data[0] 
                setCountryName(data.name.common) 
                setCapital(data.capital[0]) 
                setFlag(data.flags.png) 
                setCountry('')
            })
            .catch(error =>{ 
                setAlert(error.message)
                setVisible(true)
                console.log(error.message)   
            })
    }
    return (
        <SafeAreaView style={[styles.scroll, styles.container]}>
            <Portal>
                <Modal style={styles.modal} visible={visible} onDismiss={hideModal}>
                    <Text>{alert}</Text>
                </Modal>
            </Portal>
            <Text style={styles.headline} variant="headlineSmall">Search Country by name</Text>
            <Searchbar
                placeholder="Search Country"
                onChangeText={setCountry}
                value={country}
            />
            <Button
                mode='contained'
                onPress={getData}
                >Search</Button>
            <ScrollView>
                {data.map((item, index) => (
                    <View style={[styles.item, styles.countryView, {backgroundColor: Theme.colors.elevation.level3}]} key={index}>
                        <View style={styles.itemText} key={index}>
                            <Text variant="titleMedium">{item.countryName}</Text>
                            <Text variant="bodyLarge">{item.capital}</Text>
                        </View>
                        <Image style={styles.image} source={{ uri: item.flag }} />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
