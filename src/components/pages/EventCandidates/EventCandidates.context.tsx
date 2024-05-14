import { candidateApiSlice } from '@flux/api/candidate';
import { FindAllEventCandidatesResponseDto } from '@flux/api/candidate/dto/find-all-event-candidates.dto';
import { SheetApi, createUseContextHook, useSheet } from '@hooks';
import { useRoute } from '@react-navigation/native';
import {
	ApiIdentifier,
	EventCandidatesPageRouteProp,
	ProviderProps
} from '@types';
import React, { createContext, useState } from 'react';

export type EventCandidatesPageContextType = {
	candidatesData: FindAllEventCandidatesResponseDto[];
	candidatesError: any;
	candidatesIsLoading: boolean;
	toggleFilterId: number;
	setToggleFilterId: (value: number) => void;
	createContractSheetApi: SheetApi;
	eventId: ApiIdentifier;
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

	const createContractSheetApi = useSheet();

	if (!candidatesData) {
		return <></>;
	}

	return (
		<EventCandidatesPageContext.Provider
			value={{
				candidatesData,
				candidatesError,
				candidatesIsLoading,
				toggleFilterId,
				setToggleFilterId,
				createContractSheetApi,
				eventId: route.params.eventId
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
