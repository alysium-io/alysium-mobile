import { Section } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import React from 'react';
import FollowArtistButton from './FollowArtistButton';

interface ActionButtonsProps {
	artistData: PublicFindOneArtistResponseDto;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ artistData }) => {
	return (
		<Section marginTop='m'>
			<FollowArtistButton artistData={artistData} />
		</Section>
	);
};

export default ActionButtons;
