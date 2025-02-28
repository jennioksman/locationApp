import { Alert, View } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { styles } from "../styles/Styles"
import { loginUser, useFireAuth } from "../firebase/FirebaseAuthController"
import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"


export function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()

    async function singInAction(){
        setError(await loginUser(email, password))
    }

    if(error){
        Alert.alert(error)
        setError(null)
    }

    return (
        <SafeAreaView>
            <TextInput
                mode='flat'
                label='Email'
                value={email}
                onChangeText={setEmail}
                left={<TextInput.Icon icon={'email'}/>}
            />
            <TextInput
                mode='flat'
                label='password'
                value={password}
                onChangeText={setPassword}
                left={<TextInput.Icon icon={'lock'}/>}
            />
            <Button
                mode="contained"
                onPress={singInAction}
                >Login</Button>
        </SafeAreaView>
    )
}