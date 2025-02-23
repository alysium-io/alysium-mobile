import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Role } from '@flux/api/user/user.entity';
import { MenuListItem } from '@molecules';
import React from 'react';

interface ReportArtistMenuListItemProps {
	onPress: () => void;
}

const ReportArtistMenuListItem: React.FC<ReportArtistMenuListItemProps> = ({
	onPress
}) => {
	const { userData } = useUserAppContext();

	if (userData.role === Role.guest) {
		return null;
	}

	return (
		<MenuListItem
			onPress={onPress}
			titleTextProps={{
				title: 'Report',
				bottomSubtext: 'Report this artist',
				titleVariant: 'paragraph',
				bottomSubtextColor: 'text.q'
			}}
			icon='flag'
			iconProps={{ size: 'm' }}
		/>
	);
};

export default ReportArtistMenuListItem;
