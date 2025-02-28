import { View } from "react-native"
import { TextInput } from "react-native-paper"
import { styles } from "../styles/Styles"


export function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View>
            <TextInput
                mode='flat'
                label='email'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                mode='flat'
                label='email'
                value={password}
                onChangeText={setPassword}
            />
            <Button
                mode="contained"
                onPress={() => {
                }}
            >Login</Button>
        </View>
    )
}