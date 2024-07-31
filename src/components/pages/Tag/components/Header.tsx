import { Section, Text, View } from '@atomic';
import { FindTagCorrelatedResponseDto } from '@flux/api/tag/dto/tag-correlated.dto';
import { FindOneTagResponseDto } from '@flux/api/tag/dto/tag-find-one.dto';
import { useNavigation } from '@hooks';
import { FollowButton, Pill, PillGroup } from '@molecules';
import { Stats } from '@organisms';
import React from 'react';

interface HeaderProps {
	tagData: FindOneTagResponseDto;
	correlatedTagsData: FindTagCorrelatedResponseDto;
	onPressFollowButton: (isFollowing: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
	tagData,
	correlatedTagsData,
	onPressFollowButton
}) => {
	const { tagPage } = useNavigation();
	return (
		<View margin='m'>
			<View
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				marginTop='m'
				marginBottom='l'
			>
				<View flex={1} marginRight='m'>
					<Text variant='page-header' marginBottom='m'>
						{tagData.name}
					</Text>
				</View>
				<Stats
					items={[
						{
							title: tagData.num_followers.toLocaleString(),
							subtitle: 'follower' + (tagData.num_followers === 1 ? '' : 's'),
							onPress: () => {}
						}
					]}
				/>
			</View>
			<Section>
				<FollowButton
					defaultState={tagData.is_following}
					onChange={onPressFollowButton}
				/>
			</Section>
			<Section>
				<PillGroup>
					{correlatedTagsData.map((correlatedTag, index) => (
						<Pill
							key={index}
							text={correlatedTag.tag2_name}
							onPress={() => tagPage(correlatedTag.tag2_uid)}
						/>
					))}
				</PillGroup>
			</Section>
			<Text variant='section-header-1'>Artists</Text>
		</View>
	);
};

export default Header;
