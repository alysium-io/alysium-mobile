import { PersonaPerspective } from '@atomic';
import { useRoute } from '@react-navigation/native';
import { ArtistPageRouteProp, Persona } from '@types';
import React from 'react';
import HostPerspective from './perspectives/host/Host';
import UserPerspective from './perspectives/user/User';

const ArtistPage = () => {
	const route = useRoute<ArtistPageRouteProp>();

	return (
		<PersonaPerspective
			components={{
				[Persona.host]: () => (
					<HostPerspective artistId={route.params.artistId} />
				),
				[Persona.user]: () => (
					<UserPerspective artistId={route.params.artistId} />
				)
			}}
		/>
	);
};

export default ArtistPage;
