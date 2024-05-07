import { View } from '@atomic';
import { useNavigation } from '@hooks';
import { ContentListItemWithStatus } from '@organisms';
import { ContentType } from '@types';
import React from 'react';
import { FadeInRight, FadeOutRight } from 'react-native-reanimated';
import { useEventCandidatesPageContext } from '../EventCandidates.context';

const ContractsSection = () => {
	const { contractsData } = useEventCandidatesPageContext();
	const { editContractPage } = useNavigation();
	return (
		<View
			animated
			entering={FadeInRight.duration(200)}
			exiting={FadeOutRight.duration(200)}
		>
			{contractsData.map((contract) => (
				<ContentListItemWithStatus
					key={contract.contract_id}
					title={contract.artist.name}
					subtitle={contract.status}
					contentType={ContentType.artist}
					image={
						contract.artist.profile_image?.url ||
						'https://via.placeholder.com/150'
					}
					onPress={() => editContractPage(contract.contract_id)}
					statusText='Waiting'
					statusColor='t2'
					statusBarVariant='filled'
				/>
			))}
		</View>
	);
};

export default ContractsSection;
