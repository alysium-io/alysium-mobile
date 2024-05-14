import { ComponentsPage, ComponentsPageHeader } from '@pages';
import { createStackNavigator } from '@react-navigation/stack';
import { ComponentsStackNavigatorParamList } from '@types';
import React from 'react';
import { useTabSettings } from './settings';

export const ComponentsStack =
	createStackNavigator<ComponentsStackNavigatorParamList>();

const ComponentsTab = () => {
	const { screenOptions } = useTabSettings();

	return (
		<ComponentsStack.Navigator screenOptions={screenOptions}>
			<ComponentsStack.Screen
				name='ComponentsPage'
				component={ComponentsPage}
				options={{ header: ComponentsPageHeader }}
			/>
		</ComponentsStack.Navigator>
	);
};

export default ComponentsTab;
