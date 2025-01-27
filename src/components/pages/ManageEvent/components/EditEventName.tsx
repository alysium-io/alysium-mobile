import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { UpdateArtistEventBodyDto } from '@flux/api/event/dto/artist-event-update.dto';
import { TitleTextInput } from '@molecules';
import { NanoId } from '@types';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface EditEventNameProps {
	event_uid: NanoId;
}

const EditEventName: React.FC<EditEventNameProps> = ({ event_uid }) => {
	const { artistData } = useArtistAppContext();
	const [updateArtistEventMutation] =
		artistEventApiSlice.useUpdateArtistEventMutation();
	const { data } = artistEventApiSlice.usePrivateFindOneArtistEventQuery({
		params: {
			event_uid,
			artist_uid: artistData.artist_uid
		}
	});

	const {
		formState: { isDirty },
		control,
		handleSubmit,
		reset
	} = useForm<UpdateArtistEventBodyDto>({
		defaultValues: {
			name: data?.event.name,
			about: data?.event.about
		}
	});

	const onSubmit = async (data: UpdateArtistEventBodyDto) => {
		updateArtistEventMutation({
			params: {
				artist_uid: artistData.artist_uid,
				event_uid
			},
			body: data
		});
	};

	const onBlurEditable = () => {
		if (isDirty) {
			handleSubmit(onSubmit)();
		}
	};

	useEffect(() => {
		reset({
			name: data?.event.name,
			about: data?.event.about
		});
	}, [data]);

	return (
		<View marginHorizontal='m'>
			<Controller
				name='name'
				control={control}
				rules={{ required: true }}
				render={({ field: { onChange, value } }) => (
					<TitleTextInput
						placeholder='Event name'
						onChangeText={onChange}
						value={value}
						onBlur={onBlurEditable}
					/>
				)}
			/>
		</View>
	);
};

export default EditEventName;
