import { hostApiSlice } from '@flux/api/host';
import { Host } from '@flux/api/host/host.entity';
import { SheetApi, createUseContextHook, useSheet } from '@hooks';
import { useRoute } from '@react-navigation/native';
import { HostPageRouteProp, ProviderProps } from '@types';
import React, { createContext } from 'react';

const { useFindOneQuery } = hostApiSlice;

export type HostPageContextType = {
	moreSheetApi: SheetApi;
	notificationsSheetApi: SheetApi;
	linksSheetApi: SheetApi;
	onPressFollowers: () => void;
	onPressShows: () => void;
	openLinks: () => void;
	hostData: Host;
	hostError: any;
	hostIsLoading: boolean;
};

export const HostPageContext = createContext({} as HostPageContextType);

export const HostPageProvider: React.FC<ProviderProps> = ({ children }) => {
	const route = useRoute<HostPageRouteProp>();
	const {
		data: hostData,
		isLoading: hostIsLoading,
		error: hostError
	} = useFindOneQuery({
		params: { host_id: route.params.hostId }
	});

	const moreSheetApi = useSheet();
	const notificationsSheetApi = useSheet();
	const linksSheetApi = useSheet();

	const onPressFollowers = () => console.log('Followers');
	const onPressShows = () => console.log('Shows');
	const openLinks = () => console.log('Links');

	if (!hostData) {
		return <></>;
	}

	return (
		<HostPageContext.Provider
			value={{
				moreSheetApi,
				notificationsSheetApi,
				linksSheetApi,
				onPressFollowers,
				onPressShows,
				openLinks,
				hostData,
				hostIsLoading,
				hostError
			}}
		>
			{children}
		</HostPageContext.Provider>
	);
};

export const useHostPageContext = createUseContextHook<HostPageContextType>(
	HostPageContext,
	'HostPageContext'
);
