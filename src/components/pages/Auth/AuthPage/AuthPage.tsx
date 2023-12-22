import React, { useState } from 'react'
import { useTheme, useUser } from 'src/utils/hooks'
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { LargeTextInput, Button } from '@molecules'
import { BasePage } from '@organisms'
import {
    View,
    Icon
} from '@atomic'


const AuthPage = () => {

    const { theme } = useTheme()
    const { logIn, user } = useUser()

    const [email, setEmail] = useState<string>('dulatello08@gmail.com')
    const [password, setPassword] = useState<string>('Password')

    return (
        <BasePage>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View flex={1}>
                    <View style={styles.container} margin='m'>
                        <Icon name='logo' size='xlarge' color='bg3' />
                        <LargeTextInput
                            defaultValue={email}
                            placeholder='Email'
                            onChangeText={text => setEmail(text)}
                        />
                        <LargeTextInput
                            defaultValue={password}
                            placeholder='Password'
                            onChangeText={text => setPassword(text)}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.footer} padding='m'>
                        <Button
                            text='Log In'
                            onPress={() => console.log({ email, password })}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </BasePage>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    }
})

export default AuthPage