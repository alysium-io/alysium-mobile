import { createUseContextHook, SheetApi, useSheet } from '@hooks';
import { CreateArtistBottomSheet } from '@popups';
import { ProviderProps } from '@types';
import React, { createContext } from 'react';

export type CreateArtistContextType = {
	createArtistSheetApi: SheetApi;
};

export const CreateArtistContext = createContext({} as CreateArtistContextType);

export const CreateArtistProvider: React.FC<ProviderProps> = ({ children }) => {
	const createArtistSheetApi = useSheet();

	return (
		<CreateArtistContext.Provider
			value={{
				createArtistSheetApi
			}}
		>
			{children}
			<CreateArtistBottomSheet sheetApi={createArtistSheetApi} />
		</CreateArtistContext.Provider>
	);
};

export const useCreateArtistContext =
	createUseContextHook<CreateArtistContextType>(
		CreateArtistContext,
		'CreateArtistContext'
	);
