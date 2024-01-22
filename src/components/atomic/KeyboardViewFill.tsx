import React from 'react'
import { View } from '@atomic'
import { useKeyboard } from '@hooks'


const KeyboardViewFill = () => {
    const { height } = useKeyboard()
    return <View style={{ height }} />
}

export default KeyboardViewFill