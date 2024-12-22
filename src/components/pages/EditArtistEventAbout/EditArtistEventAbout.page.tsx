import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { UpdateArtistEventBodyDto } from '@flux/api/event/dto/artist-event-update.dto';
import { useNavigation, useToast } from '@hooks';
import { FormText } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { Alert, useGlobalLoader } from '@templates';
import { EditArtistEventAboutPageRouteProp } from '@types';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import EditArtistEventAboutPageHeader from './EditArtistEventAbout.header';

const EditArtistEventAbout = () => {
	const route = useRoute<EditArtistEventAboutPageRouteProp>();
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
			about: eventData?.event.about
		}
	});

	useEffect(() => {
		if (eventData) {
			reset({
				about: eventData.event.about
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
			<EditArtistEventAboutPageHeader
				onCancel={onCancel}
				onSubmit={handleSubmit(onSubmit)}
			/>
			<ScrollView>
				<View margin='m'>
					<Controller
						control={control}
						name='about'
						render={({ field: { onChange, value } }) => (
							<FormText
								focusOnMount
								onPressClear={() => onChange('')}
								label='About'
								placeholder='Tell fans what to expect'
								onChangeText={onChange}
								value={value ?? ''}
							/>
						)}
					/>
					<Text variant='paragraph-small-medium' color='text.q' marginTop='m'>
						We will put this description on your public event page so fans know
						what to expect.
					</Text>
				</View>
			</ScrollView>
		</BasePage>
	);
};

export default EditArtistEventAbout;
