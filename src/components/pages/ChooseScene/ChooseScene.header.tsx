import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { useNavigation } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import React from 'react';

interface ChooseScenePageHeaderProps {}

const ChooseScenePageHeader: React.FC<ChooseScenePageHeaderProps> = () => {
	const { back } = useNavigation();
	const { artistData } = useArtistAppContext();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
				CenterComponent={
					<HeaderTitle
						title={artistData.scene?.scene?.name ?? 'Choose Scene'}
						titleProps={{ variant: 'paragraph-small' }}
					/>
				}
			/>
		</Header>
	);
};

export default ChooseScenePageHeader;
