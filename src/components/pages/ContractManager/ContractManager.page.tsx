import { HeaderSafeArea, ScrollView, Text, View } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';
import { ContractsListSection } from './components';
import useContractManagerPage from './useContractManagerPage';

const ContractManagerPage = () => {
	const { contractsData } = useContractManagerPage();

	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<View margin='m'>
						<Text variant='page-header'>Contract Manager</Text>
					</View>
					<ContractsListSection contractsData={contractsData} />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default ContractManagerPage;
