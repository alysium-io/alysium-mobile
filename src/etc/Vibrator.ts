import ReactNativeHapticFeedback, { HapticFeedbackTypes } from 'react-native-haptic-feedback'
import { Platform } from 'react-native'

/**
 * Event triggers
 * 
    selection
    impactLight
    impactMedium
    impactHeavy
    rigid
    soft
    notificationSuccess
    notificationWarning
    notificationError
    clockTick
    contextClick
    keyboardPress
    keyboardRelease
    keyboardTap
    longPress
    textHandleMove
    virtualKey
    virtualKeyRelease
    effectClick
    effectDoubleClick
    effectHeavyClick
    effectTick
 * 
 */

const settings = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
}

class Vibrator {

    static trigger = (type : HapticFeedbackTypes) => {

        // Haptics on android are honestly pretty meh so we'll only trigger on iOS
        if (Platform.OS === 'ios') {
            ReactNativeHapticFeedback.trigger(type, settings)
        }
        
    }

    static light = () => Vibrator.trigger(HapticFeedbackTypes.impactLight)
    static medium = () => Vibrator.trigger(HapticFeedbackTypes.impactMedium)
    static heavy = () => Vibrator.trigger(HapticFeedbackTypes.impactHeavy)
    static selection = () => Vibrator.trigger(HapticFeedbackTypes.selection)
    static rigid = () => Vibrator.trigger(HapticFeedbackTypes.rigid)
    static soft = () => Vibrator.trigger(HapticFeedbackTypes.soft)
    static notificationSuccess = () => Vibrator.trigger(HapticFeedbackTypes.notificationSuccess)
    static notificationWarning = () => Vibrator.trigger(HapticFeedbackTypes.notificationWarning)
    static notificationError = () => Vibrator.trigger(HapticFeedbackTypes.notificationError)
    static clockTick = () => Vibrator.trigger(HapticFeedbackTypes.clockTick)
    static contextClick = () => Vibrator.trigger(HapticFeedbackTypes.contextClick)
    static keyboardPress = () => Vibrator.trigger(HapticFeedbackTypes.keyboardPress)
    static keyboardRelease = () => Vibrator.trigger(HapticFeedbackTypes.keyboardRelease)
    static keyboardTap = () => Vibrator.trigger(HapticFeedbackTypes.keyboardTap)
    static longPress = () => Vibrator.trigger(HapticFeedbackTypes.longPress)
    static textHandleMove = () => Vibrator.trigger(HapticFeedbackTypes.textHandleMove)
    static virtualKey = () => Vibrator.trigger(HapticFeedbackTypes.virtualKey)
    static virtualKeyRelease = () => Vibrator.trigger(HapticFeedbackTypes.virtualKeyRelease)
    static effectClick = () => Vibrator.trigger(HapticFeedbackTypes.effectClick)
    static effectDoubleClick = () => Vibrator.trigger(HapticFeedbackTypes.effectDoubleClick)
    static effectHeavyClick = () => Vibrator.trigger(HapticFeedbackTypes.effectHeavyClick)
    static effectTick = () => Vibrator.trigger(HapticFeedbackTypes.effectTick)

}

export default Vibrator