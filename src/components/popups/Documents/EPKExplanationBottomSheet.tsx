import { Bold, P, ScrollView, Section, Text, View } from '@atomic';
import { SheetApi } from '@hooks';
import { FullScreenSheet } from '@organisms';
import React from 'react';

interface EPKExplanationBottomSheetProps {
	sheetApi: SheetApi;
}

const EPKExplanationBottomSheet: React.FC<EPKExplanationBottomSheetProps> = ({
	sheetApi
}) => {
	return (
		<FullScreenSheet sheetApi={sheetApi}>
			<ScrollView>
				<View margin='m'>
					<Text variant='page-header' marginBottom='s'>
						Electronic Press Kit
					</Text>
					<Section marginBottom='none'>
						<P>
							An Electronic Press Kit (EPK) is your{' '}
							<Bold>professional portfolio</Bold> as a performing artist. It's a
							collection of your performance history, venues played, and
							achievements that demonstrates your experience and value to
							potential venues. Your Alysium EPK is built automatically as you
							perform and share your events.
						</P>
						<P>
							TLDR; It's a link to your Alysium profile on the Web (or in-app if
							they have Alysium downloaded).
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
						<Text variant='section-header-1' marginTop='m' marginBottom='s'>
							Helpful Tip!
						</Text>
						<P>
							After you finish a show, don't forget to go back to the event and
							add any photos or videos from the performance. This adds depth to
							your EPK, provides a more comprehensive view of your work, and
							makes it easy for future fans/venues to see what you're capable
							of!
						</P>
						<P>
							Remember... each show you perform is like a small gem, and your
							goal is to capture it in your EPK!
						</P>
					</Section>
				</View>
			</ScrollView>
		</FullScreenSheet>
	);
};

export default EPKExplanationBottomSheet;
