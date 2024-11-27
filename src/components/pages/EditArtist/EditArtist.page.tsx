import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Formatting } from '@etc';
import { artistApiSlice } from '@flux/api/artist';
import { UpdateArtistBodyDto } from '@flux/api/artist/dto/artist-update.dto';
import { useToast } from '@hooks';
import { SelfAwareScrollView, useSelfAwareScrollView } from '@molecules';
import { BasePage } from '@organisms';
import React from 'react';
import { useForm } from 'react-hook-form';
import AssetsSection from './components/AssetsSection';
import EditContactsSection from './components/EditContacts';
import EditEvents from './components/EditEvents';
import EditExternalUrlsSection from './components/EditExternalUrlsSection';
import HeaderSection from './components/HeaderSection';
import EditArtistPageHeader from './EditArtist.header';

const EditArtistPage = () => {
	const selfAwareScrollViewApi = useSelfAwareScrollView();
	const { toastError } = useToast();
	const { artistData } = useArtistAppContext();
	const [updateArtistMutation] = artistApiSlice.useUpdateArtistMutation();

	const {
		handleSubmit,
		control,
		formState: { isDirty }
	} = useForm<UpdateArtistBodyDto>({
		defaultValues: {
			name: artistData.name,
			phone_number: Formatting.formatPhoneNumber(artistData.phone_number),
			bio: artistData.bio
		}
	});

	const onSubmit = (data: UpdateArtistBodyDto) => {
		updateArtistMutation({
			params: { artist_uid: artistData.artist_uid },
			body: {
				...data,
				phone_number: Formatting.preparePhoneNumberForApi(data.phone_number)
			}
		})
			.unwrap()
			.catch(() => {
				toastError('Failed to update artist');
			});
	};

	const onBlurEditable = () => {
		if (isDirty) {
			handleSubmit(onSubmit)();
		}
	};

	return (
		<BasePage>
			<EditArtistPageHeader />
			<SelfAwareScrollView
				selfAwareScrollViewApi={selfAwareScrollViewApi}
				showsVerticalScrollIndicator={false}
			>
				<HeaderSection control={control} />
				<EditEvents />
				<AssetsSection />
				<EditContactsSection />
				<EditExternalUrlsSection />
			</SelfAwareScrollView>
		</BasePage>
	);
};

export default EditArtistPage;
