import { hostApiSlice } from '@flux/api/host';
import { Host } from '@flux/api/host/host.entity';
import { createUseContextHook, useAuth } from '@hooks';
import { ApiIdentifier, Persona, ProviderProps } from '@types';
import React, { createContext } from 'react';
import { usePersonaAppContext } from './Persona.context';

export type HostAppContextType = {
	host?: Host;
	error: any;
	isLoading: boolean;
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

	const { data, error, isLoading } = hostApiSlice.useFindOneQuery({
		params: { host_id: personaId }
	});

	return (
		<HostAppContext.Provider
			value={{
				host: data,
				error,
				isLoading,
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
