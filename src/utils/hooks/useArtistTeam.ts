import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { userArtistLinkApiSlice } from '@flux/api/user-artist-link';
import { UserArtistLinkPermissions } from '@flux/api/user-artist-link/types';
import { UserArtistLink } from '@flux/api/user-artist-link/user-artist-link.entity';
import { NanoId } from '@types';
import _ from 'lodash';

interface IUseArtistTeam {
	team?: UserArtistLink[];
	userHasExistingPermissions: (user_uid?: NanoId | null) => boolean;
	getUserPermissions: (user_uid: NanoId) => UserArtistLinkPermissions | null;
	numTeamMembers: number;
}

const useArtistTeam = (): IUseArtistTeam => {
	const { artistData } = useArtistAppContext();
	const { data } = userArtistLinkApiSlice.useGetArtistTeamQuery({
		params: {
			artist_uid: artistData.artist_uid
		}
	});

	const userHasExistingPermissions = (user_uid?: NanoId | null): boolean => {
		if (!user_uid) return false;
		const permissions = _.find(
			data,
			(teamMember) => teamMember.user.user_uid === user_uid
		);
		if (permissions === undefined || permissions === null) return false;
		return true;
	};

	const getUserPermissions = (
		user_uid: NanoId
	): UserArtistLinkPermissions | null => {
		return (
			_.find(data, (teamMember) => teamMember.user.user_uid === user_uid)
				?.permissions ?? null
		);
	};

	const _getNumberOfTeamMembers = (): number => {
		// Number of team members not including the owner which is always present
		if (data === undefined || data === null) return 0;

		const numTeamMembers = data.length;
		return numTeamMembers - 1;
	};

	return {
		team: data,
		numTeamMembers: _getNumberOfTeamMembers(),
		getUserPermissions,
		userHasExistingPermissions
	};
};

export default useArtistTeam;
