import React from 'react'
import { View } from '@atomic'
import { Button } from '@molecules'
import { useAuth } from '@hooks'


const LogoutSection = () => {

    const { logout } = useAuth()

    return (
        <View margin='m'>
            <Button
                variant='outlined'
                colorVariant='negative'
                text='Logout'
                onPress={logout}
            />
        </View>
    )
}

export default LogoutSection