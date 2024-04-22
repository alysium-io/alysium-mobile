import { SheetApi, createUseContextHook, useSheet } from '@hooks';
import { ProviderProps } from '@types';
import React, { createContext } from 'react';
import { eventApiSlice } from 'src/redux/api/event';
import { FindAllEventsResponseDto } from 'src/redux/api/event/dto/event-find-all.dto';

const { useFindAllQuery } = eventApiSlice;

export type EventManagerPageContextType = {
	eventsData: FindAllEventsResponseDto[];
	eventsError: any;
	eventsIsLoading: boolean;
	createEventStartSheetApi: SheetApi;
};

export const EventManagerPageContext = createContext(
	{} as EventManagerPageContextType
);

export const EventManagerPageProvider: React.FC<ProviderProps> = ({
	children
}) => {
	const {
		data: eventsData,
		error: eventsError,
		isLoading: eventsIsLoading
	} = useFindAllQuery({ query: { page: 1, limit: 10 } });

	const createEventStartSheetApi = useSheet();

	if (!eventsData) {
		return <></>;
	}

	return (
		<EventManagerPageContext.Provider
			value={{
				eventsData,
				eventsError,
				eventsIsLoading,
				createEventStartSheetApi
			}}
		>
			{children}
		</EventManagerPageContext.Provider>
	);
};

export const useEventManagerPageContext =
	createUseContextHook<EventManagerPageContextType>(
		EventManagerPageContext,
		'EventManagerPageContext'
	);
