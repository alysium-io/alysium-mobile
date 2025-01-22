import { AView, Text, View } from '@atomic';
import { useEnteringExitingPageAnimations, useSequence } from '@hooks';
import { ActionButtons } from '@molecules';
import React from 'react';
import { Case, Switch } from 'react-if';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page: React.FC<{ title: string; color: string }> = ({ title, color }) => {
	return (
		<View
			flex={1}
			justifyContent='center'
			alignItems='center'
			style={{ backgroundColor: color }}
		>
			<Text color='white' variant='page-header'>
				{title}
			</Text>
		</View>
	);
};

const Page1 = () => <Page title='Page 1' color='red' />;
const Page2 = () => <Page title='Page 2' color='blue' />;
const Page3 = () => <Page title='Page 3' color='green' />;

const AnimatedPageChangeTest = () => {
	const insets = useSafeAreaInsets();
	const sequenceApi = useSequence(3);
	const { entering, exiting } = useEnteringExitingPageAnimations({
		delay: 1000
	});

	return (
		<View flex={1} style={{ paddingTop: insets.top }}>
			<AView
				key={`sequence-${sequenceApi.sequenceIndex}`}
				flex={1}
				entering={entering}
				exiting={exiting}
			>
				<Switch>
					<Case condition={sequenceApi.sequenceIndex === 0}>
						<Page1 />
					</Case>
					<Case condition={sequenceApi.sequenceIndex === 1}>
						<Page2 />
					</Case>
					<Case condition={sequenceApi.sequenceIndex === 2}>
						<Page3 />
					</Case>
				</Switch>
			</AView>
			<View margin='m' style={{ paddingBottom: insets.bottom }}>
				<ActionButtons
					buttonProps={[
						{
							text: 'Back',
							onPress: sequenceApi.back
						},
						{
							text: 'Next',
							onPress: sequenceApi.next
						}
					]}
				/>
			</View>
		</View>
	);
};

export default AnimatedPageChangeTest;
