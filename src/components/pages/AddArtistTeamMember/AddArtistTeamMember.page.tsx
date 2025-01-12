import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { ScrollView, View } from '@atomic';
import { searchApiSlice } from '@flux/api/search';
import { UserSearchItem } from '@flux/api/search/search.entity';
import {
	useArtistTeam,
	useNavigation,
	usePagination,
	useSearch,
	useSheet
} from '@hooks';
import { ContentListItem } from '@molecules';
import { BasePage, SearchBar } from '@organisms';
import { ModifyArtistTeamMemberPermissionsBottomSheet } from '@popups';
import React, { useEffect, useState } from 'react';
import { Case, Switch } from 'react-if';
import { Keyboard } from 'react-native';
import AddArtistTeamMemberPageHeader from './AddArtistTeamMember.header';

const AddArtistTeamMemberPage = () => {
	const { back } = useNavigation();
	const searchApi = useSearch();
	const selectNewTeamMemberPermissionsSheetApi = useSheet();
	const { page, defaultLimit } = usePagination();
	const { userData } = useUserAppContext();
	const [selectedUser, setSelectedUser] = useState<UserSearchItem | null>(null);
	const { getUserPermissions } = useArtistTeam();

	useEffect(() => {
		setTimeout(() => {
			searchApi.pressActivate();
		}, 200);
	}, []);

	const { data } = searchApiSlice.useSearchUsersQuery({
		body: {
			q: searchApi.searchText
		},
		query: {
			page,
			limit: defaultLimit
		}
	});

	const onSelectUser = (user: UserSearchItem) => {
		Keyboard.dismiss();
		setSelectedUser(user);
		selectNewTeamMemberPermissionsSheetApi.open();
	};

	return (
		<BasePage>
			<AddArtistTeamMemberPageHeader />
			<View margin='m' zIndex={999}>
				<SearchBar searchApi={searchApi} placeholder='Search by @username' />
			</View>
			<Switch>
				<Case condition={data?.hits.length}>
					<ScrollView>
						{data?.hits.map(
							(result) =>
								result.uid !== userData.user_uid && (
									<ContentListItem
										key={result.uid}
										onPress={() => onSelectUser(result)}
										profileImageProps={{
											image: result.profile_image?.small.key
										}}
										titleTextProps={{
											title: result.handle,
											titleVariant: 'paragraph',
											bottomSubtext:
												getUserPermissions(result.uid) ?? undefined,
											bottomSubtextColor: 'text.q'
										}}
									/>
								)
						)}
					</ScrollView>
				</Case>
			</Switch>
			<ModifyArtistTeamMemberPermissionsBottomSheet
				sheetApi={selectNewTeamMemberPermissionsSheetApi}
				user_uid={selectedUser?.uid ?? null}
				handle={selectedUser?.handle ?? null}
				onPermissionsGranted={back}
				onPermissionsRevoked={back}
			/>
		</BasePage>
	);
};

export default AddArtistTeamMemberPage;
