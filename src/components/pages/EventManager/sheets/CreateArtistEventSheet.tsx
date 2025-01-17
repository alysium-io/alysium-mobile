import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { CreateArtistEventBodyDto } from '@flux/api/event/dto/artist-event-create.dto';
import { SheetApi, useNavigation, useToast } from '@hooks';
import { TextBox, useButtonState } from '@molecules';
import { FullScreenSheet } from '@organisms';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface CreateArtistEventSheetProps {
	sheetApi: SheetApi;
}

const CreateArtistEventSheet: React.FC<CreateArtistEventSheetProps> = ({
	sheetApi
}) => {
	const { toastError } = useToast();
	const {
		setButtonState,
		reset: resetButtonState,
		buttonState
	} = useButtonState('disabled');
	const { manageEventPage } = useNavigation();
	const { artistData } = useArtistAppContext();
	const [createArtistEventMutation] =
		artistEventApiSlice.useCreateArtistEventMutation();

	const {
		control,
		reset: resetForm,
		handleSubmit,
		formState: { isValid }
	} = useForm<CreateArtistEventBodyDto>();

	const onSubmit = async (data: CreateArtistEventBodyDto) => {
		try {
			setButtonState('loading');
			const response = await createArtistEventMutation({
				params: {
					artist_uid: artistData.artist_uid
				},
				body: data
			}).unwrap();

			sheetApi.close();
			setTimeout(() => {
				manageEventPage(response.event.event_uid);
			}, 500);
		} catch {
			setButtonState('active');
			toastError();
		}
	};

	useEffect(() => {
		setButtonState(isValid ? 'active' : 'disabled');
	}, [isValid]);

	const resetAll = () => {
		resetButtonState();
		resetForm();
	};

	return (
		<FullScreenSheet
			sheetApi={sheetApi}
			onDismiss={resetAll}
			buttonProps={[
				{
					text: 'cancel',
					variant: 'outlined',
					onPress: sheetApi.close
				},
				{
					text: 'Create',
					onPress: handleSubmit(onSubmit),
					color: 'p',
					buttonState: buttonState
				}
			]}
		>
			<View margin='m'>
				<Text marginBottom='m' marginLeft='s' marginTop='m'>
					Event Name
				</Text>
				<Controller
					name='name'
					control={control}
					rules={{ required: 'Name is required' }}
					render={({ field: { onChange, value } }) => (
						<TextBox
							focusOnMount
							onChangeText={onChange}
							placeholder='What was the event called?'
							subtitle="EDX Nightclub on Tuesdays, Sarah's Wedding, Ultra Miami 2024, etc."
							value={value}
						/>
					)}
				/>
			</View>
		</FullScreenSheet>
	);
};

export default CreateArtistEventSheet;
