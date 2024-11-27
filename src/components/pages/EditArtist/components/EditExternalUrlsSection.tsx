import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section, Text } from '@atomic';
import { ExternalUrl } from '@flux/api/external-url/external-url.entity';
import { ExternalUrlRefType } from '@flux/api/external-url/types';
import { useLinking, useSheet } from '@hooks';
import { MenuListItem, MenuListItemWithButton } from '@molecules';
import { CreateExternalUrlBottomSheet } from '@popups';
import { CheckShouldDeleteExternalUrlBottomSheet } from '@src/components/popups/CheckShouldDeleteExternalUrlBottomSheet';
import { getIconFromUrl } from '@src/etc/domains';
import React, { useState } from 'react';
import Separator from './Separator';

const EditExternalUrlsSection = () => {
	const createExternalUrlBottomSheetApi = useSheet();
	const checkShouldDeleteExternalUrlBottomSheetApi = useSheet();
	const { artistData } = useArtistAppContext();
	const [deleteExternalUrlState, setDeleteExternalUrlState] =
		useState<ExternalUrl | null>(null);

	const onPressDeleteExternalUrl = (externalUrl: ExternalUrl) => {
		setDeleteExternalUrlState(externalUrl);
		checkShouldDeleteExternalUrlBottomSheetApi.open();
	};

	return (
		<Section>
			<Text margin='m' variant='section-header-2'>
				External Links
			</Text>
			<MenuListItem
				titleTextProps={{
					title: 'Create Link',
					titleVariant: 'paragraph-medium',
					bottomSubtext: 'Instagram, Soundcloud, etc.',
					bottomSubtextColor: 'text.q'
				}}
				icon='plus'
				onPress={createExternalUrlBottomSheetApi.open}
			/>
			{artistData.external_urls.map((externalUrl, idx) => {
				const { go } = useLinking(externalUrl.url, externalUrl.url);
				return (
					<MenuListItemWithButton
						key={externalUrl.external_url_uid}
						onPress={go}
						onPressButton={() => onPressDeleteExternalUrl(externalUrl)}
						prefixIconProps={{
							name: getIconFromUrl(externalUrl.url)
						}}
						buttonIconProps={{
							name: 'x'
						}}
						titleTextProps={{
							title: externalUrl.name,
							bottomSubtext: externalUrl.url,
							titleVariant: 'paragraph-medium',
							bottomSubtextVariant: 'paragraph-tiny',
							bottomSubtextColor: 'text.q'
						}}
						containerProps={{
							border: idx !== artistData.external_urls.length - 1
						}}
					/>
				);
			})}
			<CreateExternalUrlBottomSheet
				sheetApi={createExternalUrlBottomSheetApi}
				refType={ExternalUrlRefType.artist}
				refId={artistData.artist_uid}
			/>
			<CheckShouldDeleteExternalUrlBottomSheet
				sheetApi={checkShouldDeleteExternalUrlBottomSheetApi}
				externalUrl={deleteExternalUrlState}
				refType={ExternalUrlRefType.artist}
			/>
			<Separator marginTop='xl' />
		</Section>
	);
};

export default EditExternalUrlsSection;
