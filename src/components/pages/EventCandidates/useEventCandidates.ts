import { candidateApiSlice } from '@flux/api/candidate';
import { FindAllEventCandidatesResponseDto } from '@flux/api/candidate/dto/find-all-event-candidates.dto';
import { contractApiSlice } from '@flux/api/contract';
import { FindAllHostContractsResponseDto } from '@flux/api/contract/dto/find-all-host-contracts.dto';
import { useSheet } from '@hooks';
import { ApiIdentifier } from '@types';
import { useState } from 'react';

interface IuseEventCandidates {
	candidatesData?: FindAllEventCandidatesResponseDto[];
	candidatesError: any;
	candidatesIsLoading: boolean;
	contractsData?: FindAllHostContractsResponseDto[];
	contractsError: any;
	contractsIsLoading: boolean;
	toggleFilterId: number;
	setToggleFilterId: (value: number) => void;
	createContractSheetApi: any;
}

const useEventCandidates = (eventId: ApiIdentifier): IuseEventCandidates => {
	const createContractSheetApi = useSheet();
	const [toggleFilterId, setToggleFilterId] = useState<number>(0);

	const {
		data: candidatesData,
		error: candidatesError,
		isLoading: candidatesIsLoading
	} = candidateApiSlice.useFindAllEventCandidatesQuery({
		query: { event_id: eventId, page: 1, limit: 10 }
	});

	const {
		data: contractsData,
		error: contractsError,
		isLoading: contractsIsLoading
	} = contractApiSlice.useFindAllHostContractsQuery({
		query: { event_id: eventId, page: 1, limit: 10 }
	});

	return {
		candidatesData,
		candidatesError,
		candidatesIsLoading,
		contractsData,
		contractsError,
		contractsIsLoading,
		toggleFilterId,
		setToggleFilterId,
		createContractSheetApi
	};
};

export default useEventCandidates;
