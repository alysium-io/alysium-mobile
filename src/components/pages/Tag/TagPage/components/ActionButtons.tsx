import React, { useState } from 'react'
import { View } from '@atomic'
import { ToggleButton } from '@molecules'


const ActionButtons = () => {

    const [state, setState] = useState(true)

    return (
        <View margin='m'>
            <ToggleButton
                value={state}
                text='Follow'
                inactiveText='Following'
                onPress={() => setState(!state)}
            />
        </View>
    )
}

export default ActionButtons