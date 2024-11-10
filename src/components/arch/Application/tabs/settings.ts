import { useTheme } from '@hooks';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import {
	ArtistAppBottomTabNavigatorParamList,
	BottomTabNavigatorParamList,
	ScreenOptions,
	UserAppBottomTabNavigatorParamList
} from '@types';
import { StyleProp, ViewStyle } from 'react-native';

interface IUseNavigationSettings {
	screenOptions: ScreenOptions;
	sceneContainerStyle: StyleProp<ViewStyle>;
	initialRoutes: {
		initialArtistAppTab: keyof ArtistAppBottomTabNavigatorParamList;
		initialHostAppTab: keyof BottomTabNavigatorParamList;
		initialTestAppTab: keyof BottomTabNavigatorParamList;
		initialUserAppTab: keyof UserAppBottomTabNavigatorParamList;
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
			initialArtistAppTab:
				'EditArtist' as keyof ArtistAppBottomTabNavigatorParamList,
			initialHostAppTab: 'Profile' as keyof BottomTabNavigatorParamList,
			initialTestAppTab: 'Pages' as keyof BottomTabNavigatorParamList,
			initialUserAppTab: 'Search' as keyof UserAppBottomTabNavigatorParamList
		}
	};

	const screenOptions = {
		...navigationConfig.screenOptions,
		tabBarInactiveTintColor: theme.colors['bg.s'],
		tabBarActiveTintColor: theme.colors['text.p'],
		tabBarStyle: {
			backgroundColor: theme.colors['bg.p'],
			borderTopWidth: undefined // if you're looking for the navbar border config, we override it in the @organism/BasePage component
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
	screenOptions: NativeStackNavigationOptions;
}

export const useTabSettings = (): IUseTabSettings => {
	const { theme } = useTheme();
	return {
		screenOptions: {
			headerShown: false,
			headerBackTitleVisible: false,
			headerTransparent: true
			// cardStyle: {
			// 	backgroundColor: theme.colors['bg.p']
			// },
			// cardOverlayEnabled: true,
			// cardShadowEnabled: true
		}
	};
};
