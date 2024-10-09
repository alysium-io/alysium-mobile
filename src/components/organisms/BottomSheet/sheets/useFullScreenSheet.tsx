import {
	createUseContextHook,
	LayoutApi,
	SheetApi,
	useLayoutDimensions
} from '@hooks';
import { ProviderProps } from '@types';
import React, { createContext } from 'react';
import {
	AnimatedKeyboardInfo,
	useAnimatedKeyboard
} from 'react-native-reanimated';

export type FullScreenSheetContextType = {
	keyboard: AnimatedKeyboardInfo;
	footerLayoutApi: LayoutApi;
	sheetApi: SheetApi;
};

export const FullScreenSheetContext = createContext(
	{} as FullScreenSheetContextType
);

type FullScreenSheetProviderProps = ProviderProps & {
	sheetApi: SheetApi;
};

export const FullScreenSheetProvider: React.FC<
	FullScreenSheetProviderProps
> = ({ children, sheetApi }) => {
	const keyboard = useAnimatedKeyboard();
	const footerLayoutApi = useLayoutDimensions();

	return (
		<FullScreenSheetContext.Provider
			value={{
				keyboard,
				footerLayoutApi,
				sheetApi
			}}
		>
			{children}
		</FullScreenSheetContext.Provider>
	);
};

export const useFullScreenSheet =
	createUseContextHook<FullScreenSheetContextType>(
		FullScreenSheetContext,
		'FullScreenSheetContext'
	);
