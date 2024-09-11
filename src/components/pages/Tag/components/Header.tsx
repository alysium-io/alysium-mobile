import { Section, Text, View } from '@atomic';
import { Formatting, Vibrator } from '@etc';
import { FindTagCorrelatedResponseDto } from '@flux/api/tag/dto/tag-correlated.dto';
import { FindOneTagResponseDto } from '@flux/api/tag/dto/tag-find-one.dto';
import { useNavigation } from '@hooks';
import { FollowButton, Pill, PillGroup } from '@molecules';
import { Stats } from '@organisms';
import {
	BehaviorAction,
	useBehaviorContext
} from '@src/utils/contexts/Behavior';
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
	const { behavior } = useBehaviorContext();

	const onPressCorrelatedTag = (tagUid: string) => {
		Vibrator.medium();
		tagPage(tagUid);
		behavior(BehaviorAction.PRESSED_CORRELATED_TAG, {
			currentTagUid: tagData.tag_uid,
			nextTagUid: tagUid
		});
	};

	return (
		<View margin='m'>
			<View
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				marginTop='m'
				marginBottom='l'
			>
				<View flex={1}>
					<Text variant='page-header' marginBottom='m' numberOfLines={2}>
						{tagData.name}
					</Text>
				</View>
				<Stats
					items={[
						{
							title: tagData.num_artists.toLocaleString(),
							subtitle: 'artist' + (tagData.num_artists === 1 ? '' : 's')
						},
						{
							title: Formatting.abbreviateNumber(tagData.spotify_followers_sum),
							subtitle: Formatting.getNumFollowersSuffix(
								tagData.spotify_followers_sum
							)
						},
						{
							title: '#' + tagData.tag_rank.toLocaleString(),
							subtitle: 'rank'
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
							onPress={() => onPressCorrelatedTag(correlatedTag.tag2_uid)}
						/>
					))}
				</PillGroup>
			</Section>
			<Text variant='section-header-1'>Artists</Text>
		</View>
	);
};

export default Header;
