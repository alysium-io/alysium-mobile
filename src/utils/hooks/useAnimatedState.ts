import { TimingConfig } from '@types'
import { SharedValue, useSharedValue, withTiming } from 'react-native-reanimated'


const defaultUserConfig : TimingConfig = {
    duration: 500
}

interface IUseAnimatedState {
    state: SharedValue<number>
    setState: (value: number) => void
    toggle: () => void
}

const useAnimatedState = (
    initialValue : number | boolean = 0,
    userConfig?: TimingConfig | undefined
) : IUseAnimatedState => {
    /**
     * This is specifically for integer-related
     * animated values.
     */

    const state = useSharedValue<number>(typeof initialValue === 'number' ? initialValue : +initialValue)

    const setState = (value: number) => {
        state.value = withTiming(
            value,
            Object.assign(userConfig || {}, defaultUserConfig)
        )
    }

    const toggle = () => {
        state.value = withTiming(
            state.value === 0 ? 1 : 0,
            Object.assign(userConfig || {}, defaultUserConfig)
        )
    }
    
    return {
        state,
        setState,
        toggle
    }
}

export default useAnimatedState