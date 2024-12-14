import { useTheme } from '@hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	ArtistAppBottomTabNavigatorParamList,
	ScreenOptions,
	UserAppBottomTabNavigatorParamList
} from '@types';
import { SharedRoutes } from '../tabs/settings';

// Bottom tab navigators
export const ArtistTabNavigator =
	createBottomTabNavigator<ArtistAppBottomTabNavigatorParamList>();
export const UserTabNavigator =
	createBottomTabNavigator<UserAppBottomTabNavigatorParamList>();

// Fallback tab
export const FALLBACK_TAB = 'Profile' satisfies SharedRoutes;

interface IUseAppSettings {
	screenOptions: ScreenOptions;
}

export const useAppSettings = (): IUseAppSettings => {
	const { theme } = useTheme();

	return {
		screenOptions: {
			headerShown: false,
			tabBarShowLabel: false,
			tabBarInactiveTintColor: theme.colors['bg.s'],
			tabBarActiveTintColor: theme.colors['text.p'],
			tabBarStyle: {
				backgroundColor: theme.colors['bg.p'],
				borderTopWidth: undefined // if you're looking for the navbar border config, we override it in the @organism/BasePage component
			}
		}
	};
};
