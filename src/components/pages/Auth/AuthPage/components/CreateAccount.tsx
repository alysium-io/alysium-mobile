import React, { useState } from 'react'
import { Icon, View } from '@atomic'
import { LargeTextInput, Button } from '@molecules'
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { FadeIn, FadeInUp, FadeOut, FadeOutDown } from 'react-native-reanimated'


interface CreateAccountProps {
    toggleAuthScreen: () => void
}

const CreateAccount : React.FC<CreateAccountProps> = ({
    toggleAuthScreen
}) => {

    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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
                            defaultValue={username}
                            placeholder='Username'
                            onChangeText={text => setUsername(text)}
                            containerProps={{ marginBottom: 'm' }}
                            icon='at'
                        />
                        <LargeTextInput
                            defaultValue={email}
                            placeholder='Email'
                            onChangeText={text => setEmail(text)}
                            containerProps={{ marginBottom: 'm' }}
                            icon='profile'
                        />
                        <LargeTextInput
                            defaultValue={password}
                            placeholder='Password'
                            onChangeText={text => setPassword(text)}
                            secureTextEntry
                            icon='lock'
                        />
                    </View>
                    <View style={styles.footer} padding='m'>
                        <Button
                            variant='outlined'
                            text='Use Existing Account'
                            onPress={toggleAuthScreen}
                            containerProps={{ marginBottom: 's' }}
                        />
                        <Button
                            text='Create Account'
                            onPress={() => console.log({ email, password })}
                            color_variant='haze'
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
        bottom: 0,
        width: '100%'
    }
})

export default CreateAccount