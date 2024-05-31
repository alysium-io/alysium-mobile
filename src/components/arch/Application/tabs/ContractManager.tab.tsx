import {
	ArtistViewContractPage,
	ArtistViewContractPageHeader,
	ContractManagerPage,
	ContractManagerPageHeader,
	EditContractPage,
	EditContractPageHeader
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
				options={{ header: ContractManagerPageHeader }}
			/>

			<ContractManagerStack.Screen
				name='EditContractPage'
				component={EditContractPage}
				options={{ header: EditContractPageHeader }}
			/>

			<ContractManagerStack.Screen
				name='ArtistViewContractPage'
				component={ArtistViewContractPage}
				options={{ header: ArtistViewContractPageHeader }}
			/>
		</ContractManagerStack.Navigator>
	);
};

export default ContractManagerTab;
