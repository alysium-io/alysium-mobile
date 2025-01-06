import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { UpdateArtistEventBodyDto } from '@flux/api/event/dto/artist-event-update.dto';
import { useNavigation, useToast } from '@hooks';
import { FormText } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { Alert, useGlobalLoader } from '@templates';
import { EditArtistEventTicketsUrlPageRouteProp } from '@types';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import EditArtistEventTicketsUrlHeader from './EditArtistEventTicketsUrl.header';

const EditArtistEventTicketsUrl = () => {
	const route = useRoute<EditArtistEventTicketsUrlPageRouteProp>();
	const { artistData } = useArtistAppContext();
	const { showLoader, hideLoader } = useGlobalLoader();
	const { toastError } = useToast();
	const { back } = useNavigation();
	const { data: eventData } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				event_uid: route.params.event_uid,
				artist_uid: artistData.artist_uid
			}
		});
	const [updateArtistEventMutation] =
		artistEventApiSlice.useUpdateArtistEventMutation();

	const {
		control,
		handleSubmit,
		formState: { isDirty },
		reset
	} = useForm<UpdateArtistEventBodyDto>({
		defaultValues: {
			tickets_url: eventData?.event.tickets_url
		}
	});

	useEffect(() => {
		if (eventData) {
			reset({
				tickets_url: eventData.event.tickets_url
			});
		}
	}, [eventData]);

	const onSubmit = (data: UpdateArtistEventBodyDto) => {
		showLoader();
		updateArtistEventMutation({
			params: {
				artist_uid: artistData.artist_uid,
				event_uid: route.params.event_uid
			},
			body: data
		})
			.catch(toastError)
			.finally(() => {
				hideLoader();
				back();
			});
	};

	const onCancel = () => {
		if (isDirty) {
			Alert.alert(
				'Discard changes?',
				'You have unsaved changes. Are you sure you want to discard them?',
				[
					{
						text: 'Cancel',
						style: 'accent'
					},
					{
						text: 'Discard',
						onPress: () => back(),
						style: 'destructive'
					}
				]
			);
		} else {
			back();
		}
	};

	return (
		<BasePage>
			<EditArtistEventTicketsUrlHeader
				onCancel={onCancel}
				onSubmit={handleSubmit(onSubmit)}
			/>
			<ScrollView>
				<View margin='m'>
					<Controller
						control={control}
						name='tickets_url'
						render={({ field: { onChange, value } }) => (
							<FormText
								focusOnMount
								onPressClear={() => onChange('')}
								label='link'
								placeholder='https://www.tickets.io'
								onChangeText={onChange}
								value={value ?? ''}
								autoCapitalize='none'
							/>
						)}
					/>
					<Text variant='paragraph-small-medium' color='text.q' marginTop='m'>
						This URL will be displayed on your public event page for fans to
						purchase tickets.
					</Text>
				</View>
			</ScrollView>
		</BasePage>
	);
};

export default EditArtistEventTicketsUrl;
