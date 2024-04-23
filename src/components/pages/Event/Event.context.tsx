import { eventApiSlice } from '@flux/api/event';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { createUseContextHook } from '@hooks';
import { useRoute } from '@react-navigation/native';
import { EventPageRouteProp, ProviderProps } from '@types';
import React, { createContext } from 'react';

export type EventPageContextType = {
	eventData: FindOneEventResponseDto;
	eventError: any;
	eventIsLoading: boolean;
};

export const EventPageContext = createContext({} as EventPageContextType);

export const EventPageProvider: React.FC<ProviderProps> = ({ children }) => {
	const route = useRoute<EventPageRouteProp>();

	const {
		data: eventData,
		error: eventError,
		isLoading: eventIsLoading
	} = eventApiSlice.useFindOneQuery({
		params: { event_id: route.params.eventId }
	});

	if (!eventData) {
		return <></>;
	}

	return (
		<EventPageContext.Provider
			value={{
				eventData,
				eventError,
				eventIsLoading
			}}
		>
			{children}
		</EventPageContext.Provider>
	);
};

export const useEventPageContext = createUseContextHook<EventPageContextType>(
	EventPageContext,
	'EventPageContext'
);
