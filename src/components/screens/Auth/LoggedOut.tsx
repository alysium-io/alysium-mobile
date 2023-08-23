import React from 'react'
import { useSettings, useTextInput, useUser } from 'src/utils/hooks'
import { LargeInput, LargeButton } from 'src/components/molecules'
import { Easing, FadeInDown, FadeOut } from 'react-native-reanimated'
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import {
    View,
    StatusBar,
    Icon,
    NotchBlur,
    Text
} from 'src/components/atomic'


const LoggedOut = () => {

    const { theme } = useSettings()
    const { logIn, user } = useUser()

    const {
        set: setIdentifier,
        get: getIdentifier
    } = useTextInput('dulatello08@gmail.com')

    const {
        set: setPassword,
        get: getPassword
    } = useTextInput('Password')

    const InvisibleText = () => {
        return (
            <Text
                variant='subtext'
                color='transparent'
                marginVertical='s'
                marginLeft='m'
            >Hehehehe</Text>
        )
    }

    const ErrorText = () => {
        return (
            <Text
                variant='subtext'
                color='danger'
                marginVertical='s'
                marginLeft='m'
            >{ user.error }</Text>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View animated exiting={FadeOut.duration(500)} variant='primary' style={styles.container}>
                <Icon name='logo' color={theme.colors.accent} size='15%' />
                <View alignItems='center' width='80%' style={styles.contentContainer}>
                    <LargeInput
                        containerProps={{
                            marginVertical: 's',
                            entering: FadeInDown.delay(0).duration(500).easing(Easing.inOut(Easing.ease))
                        }}
                        defaultValue={getIdentifier()}
                        icon='profile'
                        placeholder='email'
                        keyboardType='email-address'
                        onChangeText={setIdentifier}
                    />
                    <LargeInput
                        containerProps={{
                            marginVertical: 's',
                            entering: FadeInDown.delay(250).duration(500).easing(Easing.inOut(Easing.ease))
                        }}
                        defaultValue={getPassword()}
                        icon='lock'
                        placeholder='password'
                        secureTextEntry={true}
                        onChangeText={setPassword}
                    />
                    <LargeButton
                        containerProps={{
                            marginVertical: 's',
                            entering: FadeInDown.delay(500).duration(500).easing(Easing.inOut(Easing.ease))
                        }}
                        title='Login'
                        onPress={() => logIn(getIdentifier(), getPassword())}
                        haptic
                    />
                    { user.error ? <ErrorText /> : <InvisibleText /> }
                </View>
                <StatusBar />
                <NotchBlur />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        alignItems: 'flex-start'
    }
})

export default LoggedOut