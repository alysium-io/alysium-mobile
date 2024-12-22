import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { ScrollView } from '@atomic';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import { BasePage } from '@organisms';
import { getIconFromUrl } from '@src/etc/domains';
import React from 'react';
import EditExternalLinksPageHeader from './EditExternalLinks.header';

const EditExternalLinksPage = () => {
	const { artistData } = useArtistAppContext();
	const { editExternalLinkPage, createExternalLinkPage } = useNavigation();
	return (
		<BasePage>
			<EditExternalLinksPageHeader />
			<ScrollView>
				<ContentListItem
					onPress={createExternalLinkPage}
					profileImageProps={{
						defaultImageProps: {
							icon: 'plus'
						},
						containerProps: {
							borderWidth: 1,
							borderRadius: 'round',
							borderColor: 'border.light'
						}
					}}
					titleTextProps={{
						title: 'Create Link',
						bottomSubtext: 'Instagram, Soundcloud, etc.',
						bottomSubtextColor: 'text.q'
					}}
				/>
				{artistData.external_urls?.map((externalUrl, index) => (
					<ContentListItem
						key={`$contact-${index}-${externalUrl.external_url_uid}`}
						onPress={() => editExternalLinkPage(externalUrl)}
						profileImageProps={{
							defaultImageProps: {
								icon: getIconFromUrl(externalUrl.url)
							},
							containerProps: {
								borderWidth: 1,
								borderRadius: 'round',
								borderColor: 'border.light'
							}
						}}
						titleTextProps={{
							title: externalUrl.name,
							bottomSubtext: externalUrl.url,
							bottomSubtextColor: 'text.q'
						}}
					/>
				))}
			</ScrollView>
		</BasePage>
	);
};

export default EditExternalLinksPage;
