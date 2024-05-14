import { HeaderSafeArea, ScrollView } from '@atomic';
import { withProvider } from '@hooks';
import { BasePage } from '@organisms';
import React from 'react';
import { EditContractPageProvider } from './EditContract.context';
import AdditionalNotesSection from './components/AdditionalNotesSection';
import BottomButtonsSection from './components/BottomButtonsSection';
import EditContractPageFooter from './components/EditContractPageFooter';
import PartiesInvolvedSection from './components/PartiesInvolvedSection';
import SlotDetailsSection from './components/SlotDetailsSection';
import SlotTimeSection from './components/SlotTimeSection';

const EditContractPage = () => {
	return (
		<BasePage FooterComponent={EditContractPageFooter}>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<PartiesInvolvedSection />
					<SlotTimeSection />
					<SlotDetailsSection />
					<AdditionalNotesSection />
					<BottomButtonsSection />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default withProvider(EditContractPage, EditContractPageProvider);
