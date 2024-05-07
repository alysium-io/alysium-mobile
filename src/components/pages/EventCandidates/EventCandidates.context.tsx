import { candidateApiSlice } from '@flux/api/candidate';
import { FindAllEventCandidatesResponseDto } from '@flux/api/candidate/dto/find-all-event-candidates.dto';
import { contractApiSlice } from '@flux/api/contract';
import { FindAllContractsResponseDto } from '@flux/api/contract/dto/find-all-contracts.dto';
import { createUseContextHook } from '@hooks';
import { useRoute } from '@react-navigation/native';
import { EventCandidatesPageRouteProp, ProviderProps } from '@types';
import React, { createContext, useState } from 'react';

export type EventCandidatesPageContextType = {
	candidatesData: FindAllEventCandidatesResponseDto[];
	candidatesError: any;
	candidatesIsLoading: boolean;
	contractsData: FindAllContractsResponseDto[];
	contractsError: any;
	contractsIsLoading: boolean;
	toggleFilterId: number;
	setToggleFilterId: (value: number) => void;
};

export const EventCandidatesPageContext = createContext(
	{} as EventCandidatesPageContextType
);

export const EventCandidatesPageProvider: React.FC<ProviderProps> = ({
	children
}) => {
	const route = useRoute<EventCandidatesPageRouteProp>();
	const [toggleFilterId, setToggleFilterId] = useState<number>(0);

	const {
		data: candidatesData,
		error: candidatesError,
		isLoading: candidatesIsLoading
	} = candidateApiSlice.useFindAllEventCandidatesQuery({
		query: { event_id: route.params.eventId, page: 1, limit: 10 }
	});

	const {
		data: contractsData,
		error: contractsError,
		isLoading: contractsIsLoading
	} = contractApiSlice.useFindAllQuery({
		query: { event_id: route.params.eventId, page: 1, limit: 10 }
	});

	if (!candidatesData || !contractsData) {
		return <></>;
	}

	return (
		<EventCandidatesPageContext.Provider
			value={{
				candidatesData,
				candidatesError,
				candidatesIsLoading,
				contractsData,
				contractsError,
				contractsIsLoading,
				toggleFilterId,
				setToggleFilterId
			}}
		>
			{children}
		</EventCandidatesPageContext.Provider>
	);
};

export const useEventCandidatesPageContext =
	createUseContextHook<EventCandidatesPageContextType>(
		EventCandidatesPageContext,
		'EventCandidatesPageContext'
	);
