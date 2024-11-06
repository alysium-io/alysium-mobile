import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { useNavigation } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import React from 'react';

interface ChooseEventLocationPageHeaderProps {}

const ChooseEventLocationPageHeader: React.FC<
	ChooseEventLocationPageHeaderProps
> = () => {
	const { back } = useNavigation();
	const { artistData } = useArtistAppContext();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
				CenterComponent={
					<HeaderTitle
						title={artistData.scene?.scene?.name ?? 'Choose Event Location'}
						titleProps={{ variant: 'paragraph-small' }}
					/>
				}
			/>
		</Header>
	);
};

export default ChooseEventLocationPageHeader;
