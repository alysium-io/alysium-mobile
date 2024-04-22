import { createUseContextHook } from '@hooks';
import { useRoute } from '@react-navigation/native';
import { EventPageRouteProp, ProviderProps } from '@types';
import React, { createContext } from 'react';
import { eventApiSlice } from 'src/redux/api/event';
import { FindOneEventResponseDto } from 'src/redux/api/event/dto/event-find-one.dto';

const { useFindOneQuery } = eventApiSlice;

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
	} = useFindOneQuery({ params: { event_id: route.params.eventId } });

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
