import {
	Avatar,
	Bold,
	Icon,
	P,
	ScrollView,
	Section,
	Text,
	View
} from '@atomic';
import { SheetApi } from '@hooks';
import { FullScreenSheet } from '@organisms';
import { IconNames } from '@svg';
import React from 'react';

const DefaultImage: React.FC<{ icon: IconNames; text: string }> = ({
	icon,
	text
}) => (
	<View height={75} width={75}>
		<Avatar defaultImageProps={{ icon }} />
		<Text variant='paragraph-small-light' marginTop='s' textAlign='center'>
			{text}
		</Text>
	</View>
);

interface AboutAlysiumBottomSheetProps {
	sheetApi: SheetApi;
}

const AboutAlysiumBottomSheet: React.FC<AboutAlysiumBottomSheetProps> = ({
	sheetApi
}) => {
	return (
		<FullScreenSheet sheetApi={sheetApi}>
			<ScrollView>
				<View margin='m'>
					<Section>
						<View
							alignItems='center'
							marginTop='m'
							style={{ marginBottom: 25 }}
						>
							<Icon name='logo' size={50} />
						</View>
						<Text variant='page-header' marginBottom='s'>
							Alysium
						</Text>
						<P>
							The purpose of Alysium is to help artists{' '}
							<Bold>build their live music business</Bold>. We do that by giving
							artists the tools to create events, share them with their
							audience, and automatically save them to an EPK (Electronic Press
							Kit) so that your credibility compounds for the future. Building a
							business out of playing shows is hard, but we give you the tools
							to make managing it efficient and straightforward.
						</P>
					</Section>

					<Section>
						<Text variant='section-header-1' marginTop='m' marginBottom='s'>
							Here's how it works
						</Text>

						<Text variant='section-header-2' marginTop='m' marginBottom='s'>
							1. Create an artist account
						</Text>
						<P>
							Alysium takes on two different forms. You are either a{' '}
							<Bold>User</Bold> or an <Bold>Artist</Bold>. Users search for live
							music, Artists build it. When you first enter Alysium you are a
							User. Start by navigating to the User Profile tab where you will
							see a button at the bottom of your screen to "Create Artist". Once
							you create your artist, you will be brought into the Artist app
							which is where you can start building live music as your new
							artist.
						</P>

						<Text variant='section-header-2' marginTop='m' marginBottom='s'>
							2. Create your first event
						</Text>
						<P>
							Once you've entered the Artist app, navigate to the center tab
							which is where you will manage all of your events. Start by
							pressing "Create Event" and give your event a name.
						</P>
						<P>
							In order to publish your event, you must give it a Time and a
							Location. We also recommend adding a profile image, a description
							and a link to purchase tickets if you have one.
						</P>
						<P>
							Once published, your event becomes visible to anyone on Alysium -
							meaning anyone searching for live music on our interactive map can
							find you!
						</P>

						<Text variant='section-header-2' marginTop='m' marginBottom='s'>
							3. Share your event
						</Text>
						<P>After creating an event, there are several ways to share it:</P>

						<Text
							variant='paragraph-large-medium'
							marginTop='m'
							marginBottom='s'
						>
							1. In Person
						</Text>
						<P>
							When meeting someone interested in your show, simply pull up your
							event and show them the QR Code to scan. They'll get access to all
							event information and an interactive map with directions.
						</P>

						<Text
							variant='paragraph-large-medium'
							marginTop='m'
							marginBottom='s'
						>
							2. Social Media
						</Text>
						<P>
							Use the "Share" option in your Event Manager to access pre-built
							posters for Instagram stories. Don't forget to include your
							Alysium profile link!
						</P>

						<Text
							variant='paragraph-large-medium'
							marginTop='m'
							marginBottom='s'
						>
							3. Alysium Discovery
						</Text>
						<P>
							Your published events appear on the Alysium interactive map,
							allowing new fans to discover your shows organically.
						</P>

						<Text variant='section-header-2' marginTop='m' marginBottom='s'>
							4. Save to your EPK
						</Text>
						<P>
							After your event, save it to your EPK through the Event Manager.
							This helps:
						</P>
						<View marginLeft='m' marginBottom='m'>
							<P>• Future fans understand your vibe</P>
							<P>• Venues see your performance history</P>
							<P>• Build your professional portfolio</P>
						</View>

						<Text variant='section-header-2' marginTop='m' marginBottom='s'>
							5. Complete your artist profile
						</Text>
						<P>Enhance your presence by adding:</P>
						<View marginLeft='m' marginBottom='m'>
							<P>• Contact information</P>
							<P>• Social media links</P>
							<P>• Your home scene (city)</P>
							<P>• Media links (SoundCloud, YouTube, etc.)</P>
						</View>
						<P marginBottom='none'>
							This creates a comprehensive profile that helps connect you with
							fans, venues, and other artists in your scene.
						</P>
					</Section>
				</View>
			</ScrollView>
		</FullScreenSheet>
	);
};

export default AboutAlysiumBottomSheet;
