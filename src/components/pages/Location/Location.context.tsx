import { ProviderProps } from '@types';
import React, { createContext } from 'react';

export type LocationPageContextType = {};

export const LocationPageContext = createContext({} as LocationPageContextType);

export const LocationPageContextProvider: React.FC<ProviderProps> = ({
	children
}) => {
	return (
		<LocationPageContext.Provider value={{}}>
			{children}
		</LocationPageContext.Provider>
	);
};
