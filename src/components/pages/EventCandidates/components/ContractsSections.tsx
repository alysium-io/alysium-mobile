import { SlideInOutView } from '@atomic';
import { contractApiSlice } from '@flux/api/contract';
import { useNavigation } from '@hooks';
import { ContentListItemWithStatus } from '@organisms';
import { ContentType } from '@types';
import React from 'react';
import { useEventCandidatesPageContext } from '../EventCandidates.context';

const ContractsSection = () => {
	const { eventId } = useEventCandidatesPageContext();
	const {
		data: contractsData,
		error: contractsError,
		isLoading: contractsIsLoading
	} = contractApiSlice.useFindAllQuery({
		query: { event_id: eventId, page: 1, limit: 10 }
	});
	const { editContractPage } = useNavigation();
	if (!contractsData) {
		return null;
	}
	return (
		<SlideInOutView direction='right'>
			{contractsData.map((contract) => (
				<ContentListItemWithStatus
					key={contract.contract_id}
					title={contract.artist.name}
					subtitle={contract.status}
					contentType={ContentType.artist}
					image={contract.artist.profile_image?.url}
					onPress={() => editContractPage(contract.contract_id)}
					statusText='Waiting'
					statusColor='t2'
					statusBarVariant='filled'
				/>
			))}
		</SlideInOutView>
	);
};

export default ContractsSection;
