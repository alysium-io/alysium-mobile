import { StackNavigationOptions } from '@react-navigation/stack'
import { useIsFocused } from '@react-navigation/native'


interface IUseTabSettings {
    screenOptions: StackNavigationOptions
}

const useTabSettings = () : IUseTabSettings => {
    
    return {
        screenOptions: {
            headerShown: useIsFocused(),
            headerBackTitleVisible: false,
            headerTransparent: true
        }
    }
}

export default useTabSettings