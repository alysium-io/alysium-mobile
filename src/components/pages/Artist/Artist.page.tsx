import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { useRoute } from '@react-navigation/native';
import { ArtistPageRouteProp, Persona } from '@types';
import React from 'react';
import { Case, Switch } from 'react-if';
import HostPerspective from './perspectives/host/Host';
import UserPerspective from './perspectives/user/User';

const ArtistPage = () => {
	const route = useRoute<ArtistPageRouteProp>();
	const { personaType } = useUserAppContext();

	return (
		<Switch>
			<Case
				condition={
					personaType === Persona.user || personaType === Persona.artist
				}
			>
				<UserPerspective artist_uid={route.params.artist_uid} />
			</Case>
			<Case condition={personaType === Persona.host}>
				<HostPerspective artist_uid={route.params.artist_uid} />
			</Case>
		</Switch>
	);
};

export default ArtistPage;
