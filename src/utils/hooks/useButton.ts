import { useState } from 'react'
import { ButtonState } from '@molecules'


const useButton = (defaultButtonState: ButtonState = 'default') => {
    const [buttonState, setButtonState] = useState<ButtonState>(defaultButtonState)

    const _setButtonState = (state: ButtonState) => {
        if (state !== buttonState) {
            setButtonState(state)
        }
    }

    return {
        buttonState,
        setButtonState: _setButtonState
    }
}

export default useButton