import { usePersonaAppContext } from '@arch/Application/contexts/Persona.context';
import { useRoute } from '@react-navigation/native';
import { ArtistEventsPageRouteProp, Persona } from '@types';
import React from 'react';
import PrivateArtistEvents from './perspectives/private/ArtistEvents.page';
import PublicArtistEvents from './perspectives/public/ArtistEvents.page';

const ArtistEvents = () => {
	const { params } = useRoute<ArtistEventsPageRouteProp>();
	const { personaType, personaId } = usePersonaAppContext();

	// If we're currently logged in as this artist, display the private data
	if (personaType === Persona.artist && personaId === params.artist_uid) {
		return <PrivateArtistEvents />;
	}

	// Otherwise, display the public data
	return <PublicArtistEvents />;
};

export default ArtistEvents;
