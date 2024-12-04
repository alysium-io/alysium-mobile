import { Section } from '@atomic';
import { Vibrator } from '@etc';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { useNavigation } from '@hooks';
import { Pill, PillGroup } from '@molecules';
import React from 'react';

interface ArtistTagsProps {
	artistData: PublicFindOneArtistResponseDto;
}

const ArtistTags: React.FC<ArtistTagsProps> = ({ artistData }) => {
	const { tagPage } = useNavigation();

	const onPressArtistTag = (tag_uid: string) => {
		Vibrator.medium();
		tagPage(tag_uid, {
			from: 'ArtistPage',
			from_uid: artistData.artist_uid,
			to: 'TagPage',
			to_uid: tag_uid,
			using: 'ARTIST_PAGE_TAG'
		});
	};

	return (
		<Section>
			<PillGroup>
				{artistData.tags.map((artistTagLink, index) => (
					<Pill
						key={index}
						text={artistTagLink.tag.name}
						onPress={() => onPressArtistTag(artistTagLink.tag.tag_uid)}
					/>
				))}
			</PillGroup>
		</Section>
	);
};

export default ArtistTags;
