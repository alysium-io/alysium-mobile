import { BlurView, Overlay } from '@atomic';
import { createUseContextHook, useDisclosure } from '@hooks';
import { ProviderProps } from '@types';
import React, { createContext, useMemo } from 'react';
import LoaderKit from 'react-native-loader-kit';

interface LoaderContextType {
	showLoader: () => void;
	hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType>({} as LoaderContextType);

export const LoaderProvider: React.FC<ProviderProps> = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const value = useMemo(
		() => ({
			showLoader: onOpen,
			hideLoader: onClose
		}),
		[onOpen, onClose]
	);

	return (
		<LoaderContext.Provider value={value}>
			{children}
			<Overlay visible={isOpen}>
				<BlurView style={{ padding: 25, borderRadius: 15 }}>
					<LoaderKit
						style={{ width: 50, height: 50 }}
						name='BallClipRotateMultiple'
						color='white'
					/>
				</BlurView>
			</Overlay>
		</LoaderContext.Provider>
	);
};

export const useGlobalLoader = createUseContextHook<LoaderContextType>(
	LoaderContext,
	'LoaderContext'
);
