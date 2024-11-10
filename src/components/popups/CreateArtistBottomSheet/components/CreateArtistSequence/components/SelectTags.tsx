import { Hyperlink, Section, Text, View } from '@atomic';
import { CreateArtistTagLinkBodyDto } from '@flux/api/artist-tag-link/dto/artist-tag-link-create.dto';
import { Tag, tagApiSlice } from '@flux/api/tag';
import { TagCorrelatedCommon } from '@flux/api/tag/tag-correlated.entity';
import { ListApi, useList } from '@hooks';
import { PillList } from '@organisms';
import TogglePill from '@src/components/molecules/Pills/TogglePill';
import { NanoId } from '@types';
import React, { useEffect } from 'react';
import { TAG_LIMIT } from '../../../constants';

interface SelectTagsProps {
	selectedTagsListApi: ListApi<Omit<CreateArtistTagLinkBodyDto, 'artist_uid'>>;
}

const SelectTags: React.FC<SelectTagsProps> = ({ selectedTagsListApi }) => {
	const [findTagCorrelated] = tagApiSlice.useLazyFindTagCorrelatedQuery();

	const discoverTagsListApi = useList<Tag>({
		validator: (stateTag, tag) => stateTag.tag_uid === tag.tag_uid
	});

	const similarTagsListApi = useList<TagCorrelatedCommon>({
		validator: (stateTag, tag) => stateTag.tag2_uid === tag.tag2_uid
	});

	const { data: topTags } = tagApiSlice.useTopTagsQuery({
		query: {
			limit: 15,
			page: 1
		}
	});

	const { data: discoverTagsData, refetch: fetchDiscoverTagsData } =
		tagApiSlice.useDiscoverTagsQuery({
			query: {
				limit: 15
			}
		});

	useEffect(() => {
		if (discoverTagsData) {
			discoverTagsListApi.merge(
				discoverTagsData.filter(
					(tag) =>
						!selectedTagsListApi.exists(tag) && // Make sure it's not already in the selected tags list
						!topTags?.some((topTag) => topTag.tag_uid === tag.tag_uid) // Make sure it's not in the top tags list
				)
			);
		}
	}, [discoverTagsData, topTags]);

	const toggleTag = async (tag_uid: NanoId) => {
		const isAdded = selectedTagsListApi.toggle({ tag_uid });

		if (isAdded) {
			const correlatedTags = await findTagCorrelated({
				params: { tag_uid }
			}).unwrap();

			similarTagsListApi.merge(
				correlatedTags.filter(
					(tag) =>
						!discoverTagsListApi.isIn({ tag_uid: tag.tag2_uid }) && // Make sure it's not in the discover tags list
						!topTags?.some((topTag) => topTag.tag_uid === tag.tag2_uid) // Make sure it's not in the top tags list
				)
			);
		}
	};

	return (
		<View margin='m'>
			<Section marginTop='m'>
				<Text variant='page-header' marginBottom='s' textAlign='center'>
					Select Tags
				</Text>
				<Text
					variant='paragraph-small-light'
					marginBottom='s'
					textAlign='center'
				>
					Up to {TAG_LIMIT}
				</Text>
				<Text variant='paragraph-small-light' textAlign='center'>
					Tags are searchable categories, which makes it easier for{' '}
					<Text variant='paragraph-small-bold'>people to find you</Text>. Select
					tags that align with what you offer as an artist.
				</Text>
			</Section>
			{!similarTagsListApi.isEmpty && (
				<Section>
					<Text variant='section-header-1' marginBottom='m'>
						Similar Tags
					</Text>
					<PillList>
						{similarTagsListApi.state.map((tag) => (
							<TogglePill
								key={tag.tag2_uid}
								text={tag.tag2_name}
								isActive={selectedTagsListApi.isIn({
									tag_uid: tag.tag2_uid
								})}
								onPress={() => toggleTag(tag.tag2_uid)}
							/>
						))}
					</PillList>
				</Section>
			)}
			<Section>
				<Text variant='section-header-1' marginBottom='m'>
					Top Tags
				</Text>
				<PillList>
					{topTags?.map((tag) => (
						<TogglePill
							key={tag.tag_uid}
							text={tag.name}
							isActive={selectedTagsListApi.exists({
								tag_uid: tag.tag_uid
							})}
							onPress={() => toggleTag(tag.tag_uid)}
						/>
					))}
				</PillList>
			</Section>
			<Section>
				<Text variant='section-header-1' marginBottom='m'>
					Discover
				</Text>
				<PillList>
					{discoverTagsListApi.state.map((tag) => (
						<TogglePill
							key={tag.tag_uid}
							text={tag.name}
							isActive={selectedTagsListApi.exists({
								tag_uid: tag.tag_uid
							})}
							onPress={() => toggleTag(tag.tag_uid)}
						/>
					))}
				</PillList>
				<Hyperlink
					color='palette.s.dark'
					textAlign='center'
					onPress={fetchDiscoverTagsData}
					marginTop='m'
				>
					Load More
				</Hyperlink>
			</Section>
		</View>
	);
};

export default SelectTags;
