import { Section } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { useNavigation } from '@hooks';
import { BlockListItem } from '@molecules';
import React from 'react';

interface ArtistTagsProps {
	artistData: PublicFindOneArtistResponseDto;
}

const ArtistTags: React.FC<ArtistTagsProps> = ({ artistData }) => {
	const { tagPage } = useNavigation();
	return (
		<Section>
			{artistData.tags.map((tag) => (
				<BlockListItem
					key={tag.tag.tag_uid}
					icon='tag'
					onPress={() => tagPage(tag.tag.tag_uid)}
					titleTextProps={{
						title: tag.tag.name,
						topSubtext: `${tag.tag.num_followers} followers`
					}}
				/>
			))}
		</Section>
	);
};

export default ArtistTags;
