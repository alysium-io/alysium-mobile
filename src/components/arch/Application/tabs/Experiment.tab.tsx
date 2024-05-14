import {
	ExperimentPageOne,
	ExperimentPageOneHeader,
	ExperimentPageTwo,
	ExperimentPageTwoHeader
} from '@pages';
import { createStackNavigator } from '@react-navigation/stack';
import { ExperimentStackNavigatorParamList } from '@types';
import React from 'react';
import { useTabSettings } from './settings';

const TestStack = createStackNavigator<ExperimentStackNavigatorParamList>();

const ExperimentTab = () => {
	const { screenOptions } = useTabSettings();

	return (
		<TestStack.Navigator screenOptions={screenOptions}>
			<TestStack.Screen
				name='ExperimentPageOne'
				component={ExperimentPageOne}
				options={{ header: ExperimentPageOneHeader }}
			/>

			<TestStack.Screen
				name='ExperimentPageTwo'
				component={ExperimentPageTwo}
				options={{ header: ExperimentPageTwoHeader }}
			/>
		</TestStack.Navigator>
	);
};

export default ExperimentTab;
