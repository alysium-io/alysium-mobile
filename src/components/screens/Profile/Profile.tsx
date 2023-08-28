import React from 'react'
import { useUser } from '@hooks'
import { Text, BasePage, View, NotchMargin } from '@atomic'
import { LargeButton, StaticNotchBlur } from '@molecules'
import { StyleSheet } from 'react-native'


const Profile = () => {

    const { logout, getUser } = useUser()

    return (
        <BasePage>
            <StaticNotchBlur />
            <NotchMargin />
            <View margin='m'>
                <Text marginVertical='s'>Profile</Text>
                <View marginVertical='s'>
                    <LargeButton
                        title='Logout'
                        onPress={logout}
                        buttonType='danger'
                    />
                </View>
                <View marginVertical='s'>
                    <LargeButton
                        title='Get Me'
                        onPress={getUser}
                        buttonType='primary'
                    />
                </View>
            </View>
        </BasePage>
    )
}

const styles = StyleSheet.create({
    container: {
        
    }
})

export default Profile