import { HeaderSafeArea, ScrollView } from '@atomic';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { EditContractPageRouteProp } from '@types';
import React, { useCallback, useEffect } from 'react';
import AdditionalNotesSection from './components/AdditionalNotesSection';
import BottomButtonsSection from './components/BottomButtonsSection';
import EditContractPageFooter from './components/EditContractPageFooter';
import PartiesInvolvedSection from './components/PartiesInvolvedSection';
import SlotDetailsSection from './components/SlotDetailsSection';
import SlotTimeSection from './components/SlotTimeSection';
import useEditContractPage from './useEditContractPage';

const EditContractPage = () => {
	const route = useRoute<EditContractPageRouteProp>();
	const {
		loadForm,
		contractData,
		formMethods,
		onChangeStartTime,
		onChangeEndTime,
		additionalNotesTextInputApi,
		confirmDelete,
		onSubmit
	} = useEditContractPage(route.params.contract_uid);

	useEffect(() => {
		loadForm();
	}, [contractData]);

	const FooterComponent = useCallback(
		() => <EditContractPageFooter onSubmit={onSubmit} />,
		[onSubmit]
	);

	if (!contractData) {
		return null;
	}

	return (
		<BasePage FooterComponent={FooterComponent}>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<PartiesInvolvedSection contractData={contractData} />
					<SlotTimeSection
						formMethods={formMethods}
						onChangeStartTime={onChangeStartTime}
						onChangeEndTime={onChangeEndTime}
					/>
					<SlotDetailsSection formMethods={formMethods} />
					<AdditionalNotesSection
						formMethods={formMethods}
						additionalNotesTextInputApi={additionalNotesTextInputApi}
					/>
					<BottomButtonsSection confirmDelete={confirmDelete} />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default EditContractPage;
