import { QRCode, Section, Separator, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useClipboard, useHyperlink, useShareViewShot, useTheme } from '@hooks';
import { CircularButton } from '@molecules';
import React from 'react';
import ViewShot from 'react-native-view-shot';

interface QRCodeSectionProps {
	eventData: EventLink;
}

const QRCodeSection: React.FC<QRCodeSectionProps> = ({ eventData }) => {
	const { eventPageHyperlink } = useHyperlink();
	const { theme } = useTheme();
	const { copy } = useClipboard();
	const { captureWithOptions, viewShotRef, shareVia } = useShareViewShot(
		eventPageHyperlink(eventData.event.event_uid)
	);

	return (
		<Section marginTop='m'>
			<View justifyContent='center' alignItems='center' gap='m'>
				<View
					style={{
						borderRadius: 35,
						backgroundColor: theme.colors['palette.neutral.p1'],
						shadowColor: theme.colors['text.p'],
						padding: theme.spacing['m'],
						shadowOffset: { width: 0, height: 0 },
						shadowOpacity: 0.25,
						shadowRadius: 3.84
					}}
				>
					<ViewShot ref={viewShotRef}>
						<QRCode
							data={eventPageHyperlink(eventData.event.event_uid)}
							color={theme.colors['palette.neutral.p9']}
							size={5}
						/>
					</ViewShot>
				</View>
				<View
					flexDirection='row'
					alignItems='center'
					justifyContent='space-between'
					gap='xl'
					margin='m'
				>
					<CircularButton
						title='Save Image'
						titleProps={{ color: 'text.q', variant: 'paragraph-small' }}
						iconProps={{
							name: 'save',
							color: 'text.s'
						}}
						onPress={captureWithOptions}
					/>
					<CircularButton
						title='Copy Link'
						titleProps={{ color: 'text.q', variant: 'paragraph-small' }}
						iconProps={{
							name: 'chainlink',
							color: 'text.s'
						}}
						onPress={() =>
							copy(eventPageHyperlink(eventData.event.event_uid), {
								text1: 'Link Copied to Clipboard',
								text2: eventPageHyperlink(eventData.event.event_uid),
								props: { icon: 'link' }
							})
						}
					/>
					<CircularButton
						title='Share Via'
						titleProps={{ color: 'text.q', variant: 'paragraph-small' }}
						iconProps={{
							name: 'share-external',
							color: 'text.s'
						}}
						onPress={shareVia}
					/>
				</View>
			</View>
			<Separator size='thick' />
		</Section>
	);
};

export default QRCodeSection;
