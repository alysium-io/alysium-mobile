import { useTheme } from '@hooks';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import {
	ArtistAppBottomTabNavigatorParamList,
	UserAppBottomTabNavigatorParamList
} from '@types';

export type SharedRoutes = keyof ArtistAppBottomTabNavigatorParamList &
	keyof UserAppBottomTabNavigatorParamList;

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
