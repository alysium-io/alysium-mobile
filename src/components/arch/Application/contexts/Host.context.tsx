import { hostApiSlice } from '@flux/api/host';
import { Host } from '@flux/api/host/host.entity';
import { createUseContextHook, useAuth } from '@hooks';
import { ApiIdentifier, Persona, ProviderProps } from '@types';
import React, { createContext } from 'react';
import { usePersonaAppContext } from './Persona.context';

export type HostAppContextType = {
	hostData: Host;
	hostError: any;
	hostIsLoading: boolean;
	hostId: ApiIdentifier;
};

export const HostAppContext = createContext({} as HostAppContextType);

export const HostAppProvider: React.FC<ProviderProps> = ({ children }) => {
	const { personaId, personaType } = usePersonaAppContext();
	const { logout } = useAuth();
	if (personaType !== Persona.host || personaId === null) {
		logout();
		return <></>;
	}

	const {
		data: hostData,
		error: hostError,
		isLoading: hostIsLoading
	} = hostApiSlice.useFindOneQuery({
		params: { host_id: personaId }
	});

	if (!hostData) {
		return <></>;
	}

	return (
		<HostAppContext.Provider
			value={{
				hostData,
				hostError,
				hostIsLoading,
				hostId: personaId
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
