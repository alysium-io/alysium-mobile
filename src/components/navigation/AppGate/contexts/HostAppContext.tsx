import { createUseContextHook, useAuth } from '@hooks';
import { ApiIdentifier, Persona, ProviderProps } from '@types';
import React, { createContext } from 'react';
import { hostApiSlice } from 'src/redux/api/host';
import { Host } from 'src/redux/api/host/host.entity';
import { usePersonaAppContext } from './PersonaAppContext';

const { useFindOneQuery } = hostApiSlice;

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

	const { data, error, isLoading } = useFindOneQuery({
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
