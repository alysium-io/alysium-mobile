import { createUseContextHook } from '@hooks';
import { ProviderProps } from '@types';
import React, { createContext } from 'react';

export type ProfilePageContextType = {};

export const ProfilePageContext = createContext({} as ProfilePageContextType);

export const ProfilePageProvider: React.FC<ProviderProps> = ({ children }) => {
	return (
		<ProfilePageContext.Provider value={{}}>
			{children}
		</ProfilePageContext.Provider>
	);
};

export const useProfilePageContext =
	createUseContextHook<ProfilePageContextType>(
		ProfilePageContext,
		'ProfilePageContext'
	);
