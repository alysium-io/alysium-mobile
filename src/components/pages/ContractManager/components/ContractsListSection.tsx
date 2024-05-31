import { Section } from '@atomic';
import { FindAllArtistContractsResponseDto } from '@flux/api/contract/dto/find-all-artist-contracts.dto';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@organisms';
import { ContentType } from '@types';
import React from 'react';

interface ContractsListSectionProps {
	contractsData?: FindAllArtistContractsResponseDto[];
}

const ContractsListSection: React.FC<ContractsListSectionProps> = ({
	contractsData
}) => {
	const { artistViewContract } = useNavigation();
	return (
		<Section>
			{contractsData?.map((contract) => (
				<ContentListItem
					key={contract.contract_id}
					title={contract.event.name}
					subtitle={contract.status}
					onPress={() => artistViewContract(contract.contract_id)}
					contentType={ContentType.event}
					borderRadius='sharp'
					border
				/>
			))}
		</Section>
	);
};

export default ContractsListSection;
