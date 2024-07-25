import { Section, Text } from '@atomic';
import { CreateUserTagsFollowingResponseDto } from '@flux/api/user-tags-following/dto/user-tags-following-create.dto';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import React from 'react';

interface ArtistsProps {
	userTagsFollowingData: CreateUserTagsFollowingResponseDto[];
}

const Tags: React.FC<ArtistsProps> = ({ userTagsFollowingData }) => {
	const { tagPage } = useNavigation();

	return (
		<Section>
			<Text variant='section-header-1' margin='m'>
				Following
			</Text>
			{userTagsFollowingData.map((tag, index) => (
				<ContentListItem
					key={index}
					onPress={() => tagPage(tag.tag.tag_uid)}
					titleTextProps={{
						title: tag.tag.name,
						bottomSubtext: 'Los Angeles, CA'
					}}
					profileImageProps={{
						defaultImageProps: {
							icon: 'tag'
						}
					}}
				/>
			))}
		</Section>
	);
};

export default Tags;
