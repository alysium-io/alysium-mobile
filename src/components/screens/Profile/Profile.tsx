import React from 'react'
import { useUser } from '@hooks'
import { Text } from '@atomic'
import { Page } from '@screens'
import { LargeButton } from '@molecules'
import { StyleSheet } from 'react-native'


const Profile = () => {

    const { logout, getUser } = useUser()

    return (
        <Page>
            <Text>Profile</Text>
            <LargeButton
                title='Logout'
                onPress={logout}
                buttonType='danger'
            />
            <LargeButton
                title='Get Me'
                onPress={getUser}
                buttonType='primary'
            />
        </Page>
    )
}

const styles = StyleSheet.create({
    container: {
        
    }
})

export default Profile