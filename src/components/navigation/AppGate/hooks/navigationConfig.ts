import { BottomTabNavigatorParamList } from '@types'

const navigationConfig = {
    screenOptions: {
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: undefined,
        tabBarActiveTintColor: undefined,
        tabBarStyle: {
            backgroundColor: undefined,
            borderTopWidth: 0.5,
            borderTopColor: undefined
        }
    },
    sceneContainerStyle: {
        backgroundColor: undefined
    },
    routes: {
        initialArtistAppTab: 'Profile' as keyof BottomTabNavigatorParamList,
        initialHostAppTab: 'Profile' as keyof BottomTabNavigatorParamList,
        initialTestAppTab: 'Pages' as keyof BottomTabNavigatorParamList,
        initialUserAppTab: 'Profile' as keyof BottomTabNavigatorParamList
    }
}

export default navigationConfig