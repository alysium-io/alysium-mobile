import { useHostAppContext } from '@arch/Application/contexts/Host.context';
import { PersonaView, View } from '@atomic';
import { candidateApiSlice } from '@flux/api/candidate';
import { eventApiSlice } from '@flux/api/event';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import {
	BottomSheet,
	BottomSheetHeader,
	ContentListItemRadioToggler
} from '@organisms';
import { ApiIdentifier, Persona } from '@types';
import dayjs from 'dayjs';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AddArtistToEventCandidatesBottomSheetProps {
	sheetApi: SheetApi;
	artist_uid: ApiIdentifier;
}

const AddArtistToEventCandidatesBottomSheet: React.FC<
	AddArtistToEventCandidatesBottomSheetProps
> = ({ sheetApi, artist_uid }) => {
	const insets = useSafeAreaInsets();
	const { height } = useWindowDimensions();
	const { hostData } = useHostAppContext();
	const [createCandidateMutation] =
		candidateApiSlice.useCreateCandidateMutation();
	const [deleteCandidateMutation] =
		candidateApiSlice.useDeleteCandidateMutation();

	const { data: eventsData } = eventApiSlice.useFindAllQuery({
		query: {
			page: 1,
			limit: 10,
			host_uid: hostData.host_uid
		}
	});

	const { data: candidateEventsData } =
		candidateApiSlice.useFindAllCandidateEventsQuery({
			query: {
				page: 1,
				limit: 10,
				host_uid: hostData.host_uid,
				artist_uid
			}
		});

	const toggleCandidate = async (
		event_uid: ApiIdentifier,
		isActive: boolean
	) => {
		if (isActive) {
			await createCandidateMutation({
				body: { event_uid, artist_uid }
			});
		} else {
			await deleteCandidateMutation({
				body: { event_uid, artist_uid }
			});
		}
	};

	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} enableDynamicSizing>
			<BottomSheetView>
				<BottomSheetHeader text='Add candidate to events' />
				<ScrollView
					style={{ maxHeight: height / 2 }}
					alwaysBounceVertical={false}
				>
					{eventsData && candidateEventsData && (
						<ContentListItemRadioToggler
							subtitleFirst={true}
							items={eventsData.map((event) => ({
								id: event.event_uid,
								image: event.profile_image?.url,
								title: event.name,
								subtitle: dayjs(event.start_time).format('MMM D, YYYY'),
								defaultIsActive: candidateEventsData.some(
									(candidateEvent) =>
										candidateEvent.artist_uid === artist_uid &&
										candidateEvent.event_uid === event.event_uid
								),
								onPress: (event_uid: ApiIdentifier, isActive: boolean) =>
									console.log(event_uid, isActive),
								onPressToggle: toggleCandidate
							}))}
						/>
					)}
				</ScrollView>
				<View
					padding='m'
					style={{
						width: '100%',
						paddingBottom: insets.bottom
					}}
				>
					<Button text='Done' onPress={sheetApi.close} />
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default (props: AddArtistToEventCandidatesBottomSheetProps) => (
	<PersonaView personaType={Persona.host}>
		<AddArtistToEventCandidatesBottomSheet {...props} />
	</PersonaView>
);
