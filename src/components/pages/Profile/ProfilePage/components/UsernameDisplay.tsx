import React from 'react'
import { Icon, Text, View } from '@atomic'
import { StyleSheet } from 'react-native'
import { useArtist, useHost, usePersona, useUser } from '@hooks'
import { Persona } from '@types'


const UsernameDisplay = () => {

    const { persona } = usePersona()
    const { user } = useUser()
    const { artist } = useArtist()
    const { host } = useHost()

    if (persona.activePersonaType === Persona.user) {
        return (
            <View flexDirection='row' alignItems='center'>
                <Icon name='at' size='small' color='t1' />
                <Text variant='paragraph-large-medium' marginLeft='xs'>{user.user?.username}</Text>
            </View>
        )
    }

    if (persona.activePersonaType === Persona.artist) {
        return (
            <View flexDirection='row' alignItems='center'>
                <Text variant='paragraph-large-medium' marginLeft='xs'>{artist.artist?.attributes.name}</Text>
            </View>
        )
    }

    if (persona.activePersonaType === Persona.host) {
        return (
            <View flexDirection='row' alignItems='center'>
                <Text variant='paragraph-large-medium' marginLeft='xs'>{host.host?.attributes.name}</Text>
            </View>
        )
    }
}

export default UsernameDisplay