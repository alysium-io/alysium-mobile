import { useHostAppContext } from '@arch/Application/contexts/Host.context';
import { eventApiSlice } from '@flux/api/event';
import { FindAllEventsResponseDto } from '@flux/api/event/dto/event-find-all.dto';
import { SheetApi, createUseContextHook, useSheet } from '@hooks';
import { ProviderProps } from '@types';
import React, { createContext } from 'react';

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
	const { hostData } = useHostAppContext();
	const {
		data: eventsData,
		error: eventsError,
		isLoading: eventsIsLoading
	} = eventApiSlice.useFindAllQuery({
		query: { page: 1, limit: 10, host_id: hostData.host_id }
	});

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
