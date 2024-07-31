import { Section } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { useNavigation } from '@hooks';
import { Pill, PillGroup } from '@molecules';
import React from 'react';

interface ArtistTagsProps {
	artistData: PublicFindOneArtistResponseDto;
}

const ArtistTags: React.FC<ArtistTagsProps> = ({ artistData }) => {
	const { tagPage } = useNavigation();
	return (
		<Section>
			<PillGroup>
				{artistData.tags.map((artistTagLink, index) => (
					<Pill
						key={index}
						text={artistTagLink.tag.name}
						onPress={() => tagPage(artistTagLink.tag.tag_uid)}
					/>
				))}
			</PillGroup>
		</Section>
	);
};

export default ArtistTags;
