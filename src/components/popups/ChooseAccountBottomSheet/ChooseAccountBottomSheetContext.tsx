import { createUseContextHook, SheetApi, useSheet } from '@hooks';
import { useCreateArtistContext } from '@popups';
import { ProviderProps } from '@types';
import React, { createContext } from 'react';
import ChooseAccountBottomSheet from './ChooseAccountBottomSheet';

export type ChooseAccountContextType = {
	chooseAccountSheetApi: SheetApi;
};

export const ChooseAccountContext = createContext(
	{} as ChooseAccountContextType
);

export const ChooseAccountProvider: React.FC<ProviderProps> = ({
	children
}) => {
	const chooseAccountSheetApi = useSheet();
	const { createArtistSheetApi } = useCreateArtistContext();

	const openCreateArtistSheet = () => {
		createArtistSheetApi.open();
	};

	return (
		<ChooseAccountContext.Provider
			value={{
				chooseAccountSheetApi
			}}
		>
			{children}
			<ChooseAccountBottomSheet
				sheetApi={chooseAccountSheetApi}
				openCreateArtistSheet={openCreateArtistSheet}
			/>
		</ChooseAccountContext.Provider>
	);
};

export const useChooseAccountContext =
	createUseContextHook<ChooseAccountContextType>(
		ChooseAccountContext,
		'ChooseAccountContext'
	);
