import { QRCode, Section, Separator, View } from '@atomic';
import { Vibrator } from '@etc';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useHyperlink, useNavigation, useTheme } from '@hooks';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';

interface QRCodeSectionProps {
	eventData: EventLink;
}

const QRCodeSection: React.FC<QRCodeSectionProps> = ({ eventData }) => {
	const { eventPageHyperlink } = useHyperlink();
	const { viewEventQRCodePage } = useNavigation();
	const { theme } = useTheme();
	return (
		<Section marginTop='m'>
			<View justifyContent='center' alignItems='center'>
				<TouchableWithoutFeedback
					onPress={() => {
						Vibrator.soft();
						viewEventQRCodePage(eventData.event.event_uid);
					}}
				>
					<Animated.View
						style={{
							borderRadius: 35,
							backgroundColor: theme.colors['palette.neutral.p1'],
							shadowColor: theme.colors['text.p'],
							padding: theme.spacing['m'],
							shadowOffset: { width: 0, height: 0 },
							shadowOpacity: 0.25,
							shadowRadius: 3.84
						}}
						sharedTransitionTag={`manage-event-qr-code-${eventData.event.event_uid}`}
					>
						<QRCode
							data={eventPageHyperlink(eventData.event.event_uid)}
							color={theme.colors['palette.neutral.p9']}
							size={5}
						/>
					</Animated.View>
				</TouchableWithoutFeedback>
			</View>
			<Separator size='thick' />
		</Section>
	);
};

export default QRCodeSection;
