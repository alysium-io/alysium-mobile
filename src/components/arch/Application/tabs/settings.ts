import { useTheme } from '@hooks';
import { useIsFocused } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { BottomTabNavigatorParamList, ScreenOptions } from '@types';
import { StyleProp, ViewStyle } from 'react-native';

export const navigationConfig = {
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
};

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

	const screenOptions = {
		...navigationConfig.screenOptions,
		tabBarInactiveTintColor: theme.colors.bg2,
		tabBarActiveTintColor: theme.colors.t1,
		tabBarStyle: {
			backgroundColor: theme.colors.bg1,
			borderTopWidth: 0
		}
	};

	const sceneContainerStyle = {
		...navigationConfig.sceneContainerStyle,
		backgroundColor: theme.colors.bg1
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
	return {
		screenOptions: {
			headerShown: useIsFocused(),
			headerBackTitleVisible: false,
			headerTransparent: true
		}
	};
};
