import React from 'react'
import { Icon, Touchable } from '@atomic'
import { useGenericNavigation, useTheme } from '@hooks'


const BackButton = () => {

    const { back } = useGenericNavigation()
    const { theme } = useTheme()

    return (
        <Touchable onPress={back}>
            <Icon name='arrow' direction='left' size={25} color={theme.colors.t1} />
        </Touchable>
    )
}

export default BackButton