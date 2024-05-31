import { View } from '@atomic';
import { FindAllContractsResponseDto } from '@flux/api/contract/dto/find-all-contracts.dto';
import { useNavigation } from '@hooks';
import { ContentListItemWithStatus } from '@organisms';
import { ContentType } from '@types';
import React from 'react';

interface ContractsSectionProps {
	contractsData: FindAllContractsResponseDto[];
}

const ContractsSection: React.FC<ContractsSectionProps> = ({
	contractsData
}) => {
	const { editContractPage } = useNavigation();

	return (
		<View>
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
		</View>
	);
};

export default ContractsSection;
