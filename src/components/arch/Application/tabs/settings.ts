import { useTheme } from '@hooks';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import {
	ArtistAppBottomTabNavigatorParamList,
	ScreenOptions,
	UserAppBottomTabNavigatorParamList
} from '@types';
import { StyleProp, ViewStyle } from 'react-native';

interface IUseNavigationSettings {
	screenOptions: ScreenOptions;
	sceneContainerStyle: StyleProp<ViewStyle>;
	initialRoutes: {
		initialArtistAppTab: keyof ArtistAppBottomTabNavigatorParamList;
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
				'Search' as keyof ArtistAppBottomTabNavigatorParamList,
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
			// TODO: Check if this is the reason why base pages appear white in dark mode
			// cardStyle: {
			// 	backgroundColor: theme.colors['bg.p']
			// },
			// cardOverlayEnabled: true,
			// cardShadowEnabled: true
		}
	};
};
