import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigatorParamList } from '@types';

export type ScreenOptions =
	| BottomTabNavigationOptions
	| ((props: {
			route: RouteProp<
				BottomTabNavigatorParamList,
				keyof BottomTabNavigatorParamList
			>;
			navigation: any;
	  }) => BottomTabNavigationOptions)
	| undefined;
