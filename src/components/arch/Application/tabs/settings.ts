import { useTheme } from '@hooks';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import {
	ArtistAppBottomTabNavigatorParamList,
	ScreenOptions,
	UserAppBottomTabNavigatorParamList
} from '@types';

interface IUseNavigationSettings {
	screenOptions: ScreenOptions;
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

	return {
		screenOptions,
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
			headerTransparent: true,
			contentStyle: { backgroundColor: theme.colors['bg.p'] }
		}
	};
};
