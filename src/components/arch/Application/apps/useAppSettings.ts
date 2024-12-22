import { useTheme } from '@hooks';
import {
	ArtistAppBottomTabNavigatorParamList,
	ScreenOptions,
	UserAppBottomTabNavigatorParamList
} from '@types';

export type SharedRoutes = keyof ArtistAppBottomTabNavigatorParamList &
	keyof UserAppBottomTabNavigatorParamList;

// Fallback tab
// We save the "current tab" in the users local storage, so that the user's
// place is not lost across sessions. However, the user app and the artist app
// have different tab routes. So when we set the "initial tab" we need to first
// make sure that we are providing a valid initialRoute otherwise the app will crash.
// This is a route that we know for sure that all apps have, so that we can fallback to it
// if the current tab is not found within the bounds of the current app.
export const FALLBACK_TAB = 'Profile' satisfies SharedRoutes;

interface IUseAppSettings {
	screenOptions: ScreenOptions;
	fallbackTab: SharedRoutes;
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
		},
		fallbackTab: FALLBACK_TAB
	};
};
