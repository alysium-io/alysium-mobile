import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { artistApiSlice } from '@flux/api/artist';
import { UpdateArtistBodyDto } from '@flux/api/artist/dto/artist-update.dto';
import { useNavigation } from '@hooks';
import { FormText } from '@molecules';
import { BasePage } from '@organisms';
import { Alert, useGlobalLoader } from '@templates';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import EditArtistBioPageHeader from './EditArtistBio.header';

const EditArtistBio = () => {
	const { artistData } = useArtistAppContext();
	const { showLoader, hideLoader } = useGlobalLoader();
	const { back } = useNavigation();
	const [updateArtistMutation] = artistApiSlice.useUpdateArtistMutation();

	const {
		control,
		handleSubmit,
		formState: { isDirty }
	} = useForm<UpdateArtistBodyDto>({
		defaultValues: {
			bio: artistData.bio
		}
	});

	const onSubmit = (data: UpdateArtistBodyDto) => {
		showLoader();
		updateArtistMutation({
			params: {
				artist_uid: artistData.artist_uid
			},
			body: data
		})
			.unwrap()
			.catch(() => {
				Toast.show({
					text1: 'Error',
					text2: 'Failed to update artist bio.'
				});
			})
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
			<EditArtistBioPageHeader
				onCancel={onCancel}
				onSubmit={handleSubmit(onSubmit)}
			/>
			<ScrollView>
				<View margin='m'>
					<Controller
						control={control}
						name='bio'
						render={({ field: { onChange, value } }) => (
							<FormText
								focusConfig={{ focusOnMount: true }}
								onPressClear={() => onChange('')}
								label='Bio'
								placeholder='What can people expect from you?'
								onChangeText={onChange}
								value={value ?? ''}
							/>
						)}
					/>
				</View>
			</ScrollView>
		</BasePage>
	);
};

export default EditArtistBio;
