import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Header, HeaderSection, HeaderTitle } from '@organisms';
import React from 'react';

interface EditArtistPageHeaderProps {}

const EditArtistPageHeader: React.FC<EditArtistPageHeaderProps> = () => {
	const { artistData } = useArtistAppContext();
	return (
		<Header>
			<HeaderSection
				CenterComponent={<HeaderTitle title={artistData.name} />}
			/>
		</Header>
	);
};

export default EditArtistPageHeader;
