import { useTheme } from '@hooks'
import { ScreenOptions, BottomTabNavigatorParamList } from '@types'
import navigationConfig from './navigationConfig'
import { StyleProp, ViewStyle } from 'react-native'


interface IUseNavigationSettings {
    screenOptions: ScreenOptions
    sceneContainerStyle: StyleProp<ViewStyle>
    initialRoutes: {
        initialArtistAppTab: keyof BottomTabNavigatorParamList
        initialHostAppTab: keyof BottomTabNavigatorParamList
        initialTestAppTab: keyof BottomTabNavigatorParamList
        initialUserAppTab: keyof BottomTabNavigatorParamList
    }
}

const useNavigationSettings = () : IUseNavigationSettings => {

    const { theme } = useTheme()

    const screenOptions = {
        ...navigationConfig.screenOptions,
        tabBarInactiveTintColor: theme.colors.bg2,
        tabBarActiveTintColor: theme.colors.t1,
        tabBarStyle: {
            backgroundColor: theme.colors.bg1,
            borderTopWidth: 0
        }
    }

    const sceneContainerStyle = {
        ...navigationConfig.sceneContainerStyle,
        backgroundColor: theme.colors.bg1
    }
    
    return {
        screenOptions,
        sceneContainerStyle,
        initialRoutes: {
            initialArtistAppTab: navigationConfig.routes.initialArtistAppTab,
            initialHostAppTab: navigationConfig.routes.initialHostAppTab,
            initialTestAppTab: navigationConfig.routes.initialTestAppTab,
            initialUserAppTab: navigationConfig.routes.initialUserAppTab
        }
    }
}

export default useNavigationSettings