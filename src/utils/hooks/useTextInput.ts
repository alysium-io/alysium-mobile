import React, { useRef } from 'react'
import { TextInput as RNTextInput } from 'react-native'


export interface TextInputApi {
    ref: React.RefObject<RNTextInput>
    focus: () => void
    blur: () => void
    clear: () => void
}

const useTextInput = () : TextInputApi => {

    const ref = useRef<RNTextInput>(null)

    const focus = () => ref.current?.focus()
    const blur = () => ref.current?.blur()

    const clear = () => ref.current?.clear()

    return {
        ref,
        focus,
        blur,
        clear
    }
}

export default useTextInput