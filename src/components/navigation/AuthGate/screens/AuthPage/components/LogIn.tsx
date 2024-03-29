import React, { useState } from 'react'
import { Icon, View } from '@atomic'
import { LargeTextInput, Button } from '@molecules'
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { useAuth, useUser } from '@hooks'


interface LogInProps {
    toggleAuthScreen: () => void
}

const LogIn : React.FC<LogInProps> = ({
    toggleAuthScreen
}) => {

    const [email, setEmail] = useState<string>('dulatello08@gmail.com')
    const [password, setPassword] = useState<string>('Password')

    const { login } = useAuth()

    return (
        <View
            animated
            entering={FadeIn.duration(350)}
            exiting={FadeOut.duration(350)}
            flex={1}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View flex={1}>
                    <View style={styles.container} margin='m'>
                        <View marginBottom='m'>
                            <Icon name='logo' size='xlarge' color='bg3' />
                        </View>
                        <LargeTextInput
                            defaultValue={email}
                            placeholder='Email'
                            onChangeText={text => setEmail(text)}
                            containerProps={{ marginVertical: 'm' }}
                            icon='profile'
                        />
                        <LargeTextInput
                            defaultValue={password}
                            placeholder='Password'
                            onChangeText={text => setPassword(text)}
                            icon='lock'
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.footer} padding='m'>
                        <View marginBottom='m'>
                            <Button
                                variant='outlined'
                                text='Create Account'
                                onPress={toggleAuthScreen}
                            />
                        </View>
                        <Button
                            text='Log In'
                            onPress={() => login(email, password)}
                            colorVariant='positive'
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
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
        bottom: 25,
        width: '100%'
    }
})

export default LogIn