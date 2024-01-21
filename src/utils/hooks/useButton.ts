import { useState } from 'react'
import { ButtonState } from '@molecules'


const useButton = () => {
    const [buttonState, setButtonState] = useState<ButtonState>('default')

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