import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Role } from '@flux/api/user/user.entity';
import React from 'react';
import GuestProfile from './perspectives/guest/GuestProfile';
import UserProfile from './perspectives/user/UserProfile';

const ProfilePage = () => {
	const { userData } = useUserAppContext();

	if (userData.role === Role.guest) {
		return <GuestProfile />;
	}

	return <UserProfile />;
};

export default ProfilePage;
