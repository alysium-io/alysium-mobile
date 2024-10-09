import { usePersonaAppContext } from '@arch/Application/contexts/Persona.context';
import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Role } from '@flux/api/user/user.entity';
import { Persona } from '@types';
import React from 'react';
import ArtistProfile from './perspectives/artist/ArtistProfile';
import GuestProfile from './perspectives/guest/GuestProfile';
import UserProfile from './perspectives/user/UserProfile';

const ProfilePage = () => {
	const { userData } = useUserAppContext();
	const { personaType } = usePersonaAppContext();

	if (userData.role === Role.guest) {
		return <GuestProfile />;
	} else if (personaType === Persona.user) {
		return <UserProfile />;
	} else if (personaType === Persona.artist) {
		return <ArtistProfile />;
	} else {
		throw new Error('Invalid persona type');
	}
};

export default ProfilePage;
