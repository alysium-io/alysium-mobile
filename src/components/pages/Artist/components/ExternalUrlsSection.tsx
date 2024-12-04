import { Section, Text } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { useLinking } from '@hooks';
import { MenuListItem } from '@molecules';
import { getIconFromUrl } from '@src/etc/domains';
import React from 'react';

interface ExternalUrlsSectionProps {
	artistData: PublicFindOneArtistResponseDto;
}

const ExternalUrlsSection: React.FC<ExternalUrlsSectionProps> = ({
	artistData
}) => {
	if (!artistData.external_urls || artistData.external_urls.length === 0) {
		return null;
	}

	return (
		<Section>
			<Text marginLeft='m' variant='section-header-1'>
				Links
			</Text>
			{artistData.external_urls.map((externalUrl) => {
				const { go } = useLinking(externalUrl.url, externalUrl.url);
				return (
					<MenuListItem
						key={externalUrl.external_url_uid}
						onPress={go}
						prefixIconProps={{
							name: getIconFromUrl(externalUrl.url)
						}}
						titleTextProps={{
							title: externalUrl.name,
							bottomSubtext: externalUrl.url,
							titleVariant: 'paragraph-medium',
							bottomSubtextVariant: 'paragraph-tiny',
							bottomSubtextColor: 'text.q'
						}}
					/>
				);
			})}
		</Section>
	);
};

export default ExternalUrlsSection;
