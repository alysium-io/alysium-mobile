import { HeaderSafeArea, ScrollView } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';
import { EditContractPageProvider } from './EditContract.context';
import EditContractPageFooter from './components/EditContractPageFooter';
import PartiesInvolvedSection from './components/PartiesInvolvedSection';
import SlotTimeSection from './components/SlotTimeSection';

const EditContractPage = () => {
	return (
		<BasePage FooterComponent={EditContractPageFooter}>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<PartiesInvolvedSection />
					<SlotTimeSection />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default () => (
	<EditContractPageProvider>
		<EditContractPage />
	</EditContractPageProvider>
);
