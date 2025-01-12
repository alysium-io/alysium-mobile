import { useNavigation } from '@hooks';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import React from 'react';

interface EditArtistTeamPageHeaderProps {}

const EditArtistTeamPageHeader: React.FC<
	EditArtistTeamPageHeaderProps
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

export default EditArtistTeamPageHeader;
