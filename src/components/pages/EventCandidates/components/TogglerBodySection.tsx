import { ConditionalRenderer } from '@atomic';
import { FindAllEventCandidatesResponseDto } from '@flux/api/candidate/dto/find-all-event-candidates.dto';
import { FindAllContractsResponseDto } from '@flux/api/contract/dto/find-all-contracts.dto';
import { SheetApi } from '@hooks';
import { ApiIdentifier } from '@types';
import React from 'react';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import CandidatesSection from './CandidatesSection';
import ContractsSection from './ContractsSections';

interface TogglerBodySectionProps {
	toggleFilterId: number;
	candidatesData: FindAllEventCandidatesResponseDto[];
	createContractSheetApi: SheetApi;
	eventId: ApiIdentifier;
	contractsData: FindAllContractsResponseDto[];
}

const TogglerBodySection: React.FC<TogglerBodySectionProps> = ({
	toggleFilterId,
	candidatesData,
	createContractSheetApi,
	eventId,
	contractsData
}) => {
	return (
		<LayoutAnimationConfig skipEntering>
			<ConditionalRenderer
				componentKey={toggleFilterId}
				componentMap={{
					[0]: () => (
						<CandidatesSection
							candidatesData={candidatesData}
							createContractSheetApi={createContractSheetApi}
							eventId={eventId}
						/>
					),
					[1]: () => <ContractsSection contractsData={contractsData} />
				}}
			/>
		</LayoutAnimationConfig>
	);
};

export default TogglerBodySection;
