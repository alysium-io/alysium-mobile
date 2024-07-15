import { useTheme } from '@hooks';
import { useIsFocused } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { BottomTabNavigatorParamList, ScreenOptions } from '@types';
import { StyleProp, ViewStyle } from 'react-native';

interface IUseNavigationSettings {
	screenOptions: ScreenOptions;
	sceneContainerStyle: StyleProp<ViewStyle>;
	initialRoutes: {
		initialArtistAppTab: keyof BottomTabNavigatorParamList;
		initialHostAppTab: keyof BottomTabNavigatorParamList;
		initialTestAppTab: keyof BottomTabNavigatorParamList;
		initialUserAppTab: keyof BottomTabNavigatorParamList;
	};
}

export const useNavigationSettings = (): IUseNavigationSettings => {
	const { theme } = useTheme();

	const navigationConfig = {
		screenOptions: {
			headerShown: false,
			tabBarShowLabel: false,
			tabBarInactiveTintColor: undefined,
			tabBarActiveTintColor: undefined,
			tabBarStyle: {
				backgroundColor: undefined,
				borderTopWidth: theme.borderWidth.normal,
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
	};

	const screenOptions = {
		...navigationConfig.screenOptions,
		tabBarInactiveTintColor: theme.colors['bg.s'],
		tabBarActiveTintColor: theme.colors['text.p'],
		tabBarStyle: {
			backgroundColor: theme.colors['bg.p'],
			borderTopWidth: 0
		}
	};

	const sceneContainerStyle = {
		...navigationConfig.sceneContainerStyle,
		backgroundColor: theme.colors['bg.p']
	};

	return {
		screenOptions,
		sceneContainerStyle,
		initialRoutes: {
			initialArtistAppTab: navigationConfig.routes.initialArtistAppTab,
			initialHostAppTab: navigationConfig.routes.initialHostAppTab,
			initialTestAppTab: navigationConfig.routes.initialTestAppTab,
			initialUserAppTab: navigationConfig.routes.initialUserAppTab
		}
	};
};

interface IUseTabSettings {
	screenOptions: StackNavigationOptions;
}

export const useTabSettings = (): IUseTabSettings => {
	const { theme } = useTheme();
	return {
		screenOptions: {
			headerShown: useIsFocused(),
			headerBackTitleVisible: false,
			headerTransparent: true,
			cardStyle: {
				backgroundColor: theme.colors['bg.p']
			}
		}
	};
};
