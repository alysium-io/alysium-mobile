import { artistApiSlice } from '@flux/api/artist';
import {
	Header,
	HeaderBackButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import { NanoId } from '@types';
import React from 'react';

interface ArtistEventsInteractiveMapHeaderProps {
	artist_uid: NanoId;
	numEvents: number;
}

const ArtistEventsInteractiveMapHeader: React.FC<
	ArtistEventsInteractiveMapHeaderProps
> = ({ artist_uid, numEvents }) => {
	const { data } = artistApiSlice.usePublicFindOneArtistQuery({
		params: {
			artist_uid
		}
	});

	return (
		<Header position='absolute' top={0} left={0} right={0} zIndex={9999}>
			<HeaderSection
				LeftComponent={<HeaderBackButton />}
				CenterComponent={
					<HeaderTitle
						title={data?.name}
						subtitle={`${numEvents} event${numEvents === 1 ? '' : 's'}`}
						titleProps={{
							textAlign: 'center'
						}}
						subtitleProps={{
							textAlign: 'center'
						}}
					/>
				}
			/>
		</Header>
	);
};

export default ArtistEventsInteractiveMapHeader;
