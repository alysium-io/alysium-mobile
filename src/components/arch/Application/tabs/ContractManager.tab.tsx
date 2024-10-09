import {
	ArtistViewContractPage,
	ContractManagerPage,
	EditContractPage
} from '@pages';
import { createStackNavigator } from '@react-navigation/stack';
import { ContractManagerStackNavigatorParamList } from '@types';
import React from 'react';
import { useTabSettings } from './settings';

export const ContractManagerStack =
	createStackNavigator<ContractManagerStackNavigatorParamList>();

const ContractManagerTab = () => {
	const { screenOptions } = useTabSettings();

	return (
		<ContractManagerStack.Navigator screenOptions={screenOptions}>
			<ContractManagerStack.Screen
				name='ContractManagerPage'
				component={ContractManagerPage}
			/>

			<ContractManagerStack.Screen
				name='EditContractPage'
				component={EditContractPage}
			/>

			<ContractManagerStack.Screen
				name='ArtistViewContractPage'
				component={ArtistViewContractPage}
			/>
		</ContractManagerStack.Navigator>
	);
};

export default ContractManagerTab;
