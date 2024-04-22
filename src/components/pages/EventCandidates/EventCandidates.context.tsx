import { createUseContextHook } from '@hooks';
import { ProviderProps } from '@types';
import React, { createContext, useState } from 'react';

export type EventCandidatesPageContextType = {
	toggleFilterId: number;
	setToggleFilterId: (value: number) => void;
};

export const EventCandidatesPageContext = createContext(
	{} as EventCandidatesPageContextType
);

export const EventCandidatesPageProvider: React.FC<ProviderProps> = ({
	children
}) => {
	const [toggleFilterId, setToggleFilterId] = useState<number>(0);

	return (
		<EventCandidatesPageContext.Provider
			value={{
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
