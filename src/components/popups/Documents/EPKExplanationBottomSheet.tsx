import { Bold, P, Section, Text, View } from '@atomic';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import {
	FullScreenSheet,
	FullScreenSheetScrollView,
	FullScreenSheetStandardHeader
} from '@organisms';
import FullScreenSheetFooter from '@src/components/organisms/BottomSheet/sheets/FullScreenSheetFooter';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import React, { useCallback } from 'react';

interface EPKExplanationBottomSheetProps {
	sheetApi: SheetApi;
}

const EPKExplanationBottomSheet: React.FC<EPKExplanationBottomSheetProps> = ({
	sheetApi
}) => {
	const { behavior } = useBehaviorContext();
	const sheetDidOpen = () => {
		behavior('POPUP_WHAT_IS_EPK_ALYSIUM');
	};

	const footerComponent = useCallback(
		(props: BottomSheetFooterProps) => (
			<FullScreenSheetFooter {...props}>
				<View flex={1}>
					<Button text='Dismiss' onPress={sheetApi.close} />
				</View>
			</FullScreenSheetFooter>
		),
		[]
	);

	return (
		<FullScreenSheet
			sheetApi={sheetApi}
			footerComponent={footerComponent}
			sheetDidOpen={sheetDidOpen}
		>
			<FullScreenSheetStandardHeader />
			<FullScreenSheetScrollView>
				<View margin='m'>
					<Text variant='page-header' marginBottom='s'>
						Electronic Press Kit
					</Text>
					<Section>
						<P>
							An Electronic Press Kit (EPK) is your{' '}
							<Bold>professional portfolio</Bold> as a performing artist. It's a
							collection of your performance history, venues played, and
							achievements that demonstrates your experience and value to
							potential venues. Your Alysium EPK is built automatically as you
							perform and share your events.
						</P>
						<Text variant='section-header-1' marginTop='m' marginBottom='s'>
							Why is it important?
						</Text>
						<P>
							Venues need efficient ways to evaluate artists. Rather than
							relying on in-person scouting or word-of-mouth recommendations,
							your EPK provides concrete evidence of your performance track
							record. This makes it easier for venues to:
						</P>
						<View marginLeft='m' marginBottom='m'>
							<P>• Assess if you're a good fit for their space</P>
							<P>• Make quick, informed booking decisions</P>
							<P>• Reduce their risk when working with new artists</P>
						</View>
						<Text variant='section-header-1' marginTop='m' marginBottom='s'>
							Building your EPK in Alysium
						</Text>
						<P>
							Building your EPK is <Bold>automatic</Bold> - just focus on
							creating and documenting your shows. Each time you:
						</P>
						<View marginLeft='m' marginBottom='m'>
							<P>1. Create an event in Alysium</P>
							<P>2. Share it with your followers</P>
							<P>3. Complete the performance</P>
						</View>
						<P>
							The event details are automatically added to your performance
							history and EPK. This creates a growing portfolio that helps you
							book future shows more effectively.
						</P>
						<P marginBottom='none'>
							Your EPK is always accessible through your profile's QR code,
							making it easy to share with venues and promoters anytime.
						</P>
					</Section>
				</View>
			</FullScreenSheetScrollView>
		</FullScreenSheet>
	);
};

export default EPKExplanationBottomSheet;
