import { hostApiSlice } from '@flux/api/host';
import { Host } from '@flux/api/host/host.entity';
import { MediaRefType } from '@flux/api/media/media.entity';
import { createUseContextHook, useMedia } from '@hooks';
import { ProviderProps } from '@types';
import React, { createContext } from 'react';
import { Asset } from 'react-native-image-picker';
import { usePersonaAppContext } from './Persona.context';

export type HostAppContextType = {
	hostData: Host;
	hostError: any;
	hostIsLoading: boolean;
	setHostProfileImage: (image: Asset) => void;
};

export const HostAppContext = createContext({} as HostAppContextType);

export const HostAppProvider: React.FC<ProviderProps> = ({ children }) => {
	const { personaId } = usePersonaAppContext();

	const {
		data: hostData,
		error: hostError,
		isLoading: hostIsLoading
	} = hostApiSlice.useFindOneQuery({
		params: { host_id: personaId }
	});

	const { uploadMedia } = useMedia();
	const setHostProfileImage = (image: Asset) => {
		if (hostData) {
			uploadMedia(
				{
					ref: MediaRefType.host,
					refId: hostData.host_id,
					field: 'profile_image'
				},
				image
			);
		}
	};

	if (!hostData) {
		return <></>;
	}

	return (
		<HostAppContext.Provider
			value={{
				hostData,
				hostError,
				hostIsLoading,
				setHostProfileImage
			}}
		>
			{children}
		</HostAppContext.Provider>
	);
};

export const useHostAppContext = createUseContextHook<HostAppContextType>(
	HostAppContext,
	'HostAppContext'
);
