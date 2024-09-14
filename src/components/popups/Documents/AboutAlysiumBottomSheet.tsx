import { Avatar, Bold, Icon, Link, P, Section, Text, View } from '@atomic';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import { FullScreenSheetWithHeaderAndFooter } from '@organisms';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
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
	const { behavior } = useBehaviorContext();
	const sheetDidOpen = () => {
		behavior('POPUP_ABOUT_ALYSIUM');
	};

	const FooterContent = (
		<View flex={1}>
			<Button text='Dismiss' onPress={sheetApi.close} />
		</View>
	);

	return (
		<FullScreenSheetWithHeaderAndFooter
			sheetApi={sheetApi}
			FooterContent={FooterContent}
			sheetDidOpen={sheetDidOpen}
		>
			<View margin='m'>
				<Section>
					<View alignItems='center' marginTop='m' style={{ marginBottom: 25 }}>
						<Icon name='logo' size={50} />
					</View>
					<Text variant='page-header' marginBottom='s'>
						Alysium
					</Text>
				</Section>
				<Section marginBottom='none'>
					<P>
						The purpose of Alysium is to help people build their{' '}
						<Bold>live music business</Bold>, and help deliver that to fans.
					</P>
					<P>
						It's not like there isn't music happening all around us...
						constantly... I want to grab a drink and listen to some electronic
						music tonight... where do I go? I know it's out there...but{' '}
						<Bold>where is the music?</Bold>
					</P>
					<P>
						The live music world is currently dominated by{' '}
						<Bold>big corporations</Bold> that refused to prioritize the needs
						of the hosts and artists that work so hard to bring culture to our
						communities.
					</P>
					<P>
						The industry has been monopolized, optimized, and corporatized. They
						are only interested in turning your experience into a commodity that
						they can scale to arenas, stadiums, and festivals. So the answer is
						simple... Why can't you find your local jazz bar? Because it doesn't{' '}
						<Bold>benefit them</Bold>.
					</P>
					<P>
						We are building Alysium for <Bold>the people</Bold>. We are building
						Alysium for the <Bold>hosts</Bold> that want to bring culture to
						their communities. We are building Alysium for the{' '}
						<Bold>artists</Bold> that want to share their music with the world.
						We are building Alysium for the <Bold>fans</Bold> that want to{' '}
						<Bold>dance</Bold>.
					</P>
					<P>And here's exactly how we're going to do it.</P>
					<View alignItems='center' style={{ marginVertical: 50 }}>
						<View
							flexDirection='row'
							justifyContent='space-around'
							width='100%'
							style={{ marginBottom: 50 }}
						>
							<DefaultImage icon='host' text='Host' />
							<DefaultImage icon='artist' text='Artist' />
						</View>
						<DefaultImage icon='user' text='Fan' />
					</View>
					<P>
						The live music world is split into 3 major groups:{' '}
						<Bold>hosts</Bold>, <Bold>artists</Bold>, and <Bold>fans</Bold>.
					</P>
					<P>
						<Bold>Hosts</Bold> want to...{'\n\n'}
						1. Find high quality artists they know will sell tickets{'\n'}
						2. Have a mechanism to sell tickets{'\n'}
						3. Market their events to fans{'\n'}
					</P>
					<P>
						<Bold>Artists</Bold> want to...{'\n\n'}
						1. Find the right venues to be booked at{'\n'}
						2. Stay connected to the fans who want to support them{'\n'}
					</P>
					<P>
						<Bold>Fans</Bold> want to...{'\n\n'}
						1. Find live music{'\n'}
						2. Stay connected to artists & hosts they love{'\n'}
						3. Dance{'\n'}
					</P>
					<P>So how do we bring these people together?</P>
					<P>
						1. We start by building tools to make life easier for hosts while
						building a show. We will provide them with the tools to search and
						contract artists, sell tickets, and market their events.{'\n'}
						2. Then we build tools for artists to find venues, escrowed
						contracts to verify that they will be paid, and a profile that their
						fans can follow.{'\n'}
						3. Once we can help the hosts & artists build their business, we can
						finally focus on delivering those events to the fans.
					</P>
					<P>
						It starts with the business, but it ends with the fans, and we are
						building Alysium for <Bold>the people</Bold>.
					</P>
					<P marginBottom='none'>
						We will share more about our journey, our progress, and our vision
						as we continue to build Alysium. And if you ever have any questions,
						feel free to email us at <Link>alec@alysium.io</Link>
					</P>
				</Section>
			</View>
		</FullScreenSheetWithHeaderAndFooter>
	);
};

export default AboutAlysiumBottomSheet;
