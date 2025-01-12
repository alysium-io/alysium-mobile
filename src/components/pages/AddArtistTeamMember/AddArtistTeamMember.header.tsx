import { useNavigation } from '@hooks';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import React from 'react';

interface AddArtistTeamMemberPageHeaderProps {}

const AddArtistTeamMemberPageHeader: React.FC<
	AddArtistTeamMemberPageHeaderProps
> = () => {
	const { back } = useNavigation();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton name='arrow-left' onPress={back} />}
			/>
		</Header>
	);
};

export default AddArtistTeamMemberPageHeader;
