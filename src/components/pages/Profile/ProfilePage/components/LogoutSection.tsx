import React from 'react'
import { View } from '@atomic'
import { Button } from '@molecules'
import { useUser } from '@hooks'


const LogoutSection = () => {

    const { logout } = useUser()

    return (
        <View margin='m'>
            <Button
                variant='outlined'
                color_variant='haze'
                text='Logout'
                onPress={logout}
            />
        </View>
    )
}

export default LogoutSection