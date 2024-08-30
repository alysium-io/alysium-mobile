import { Text, View } from '@atomic';
import { useSequence } from '@hooks';
import { Button, Sequence, TabToggler } from '@molecules';
import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';

const FadeInOutSequence = () => {
	/**
	 * Demonstrate usage of the Sequence component.
	 *
	 * Has the following features:
	 *  1. Sequence of 3 views that slide in and out depending on their position
	 *  2. Smooth hight transitions
	 *  3. Next and back buttons to navigate the sequence
	 *  4. TabToggler to navigate the sequence (allows for "jupming" to a specific index)
	 */
	const sequenceApi = useSequence(2); // 3 views, 0-indexed, 3 - 1 = 2

	return (
		<View flex={1}>
			<Sequence sequenceApi={sequenceApi}>
				<View
					layout={LinearTransition.duration(200)}
					style={[
						styles.exampleView,
						{
							height: 300,
							width: '100%',
							backgroundColor: 'red'
						}
					]}
				>
					<Text variant='paragraph-large-medium' color='text.negative.p'>
						Index: 0/{sequenceApi.numItems}
					</Text>
				</View>
				<View
					layout={LinearTransition.duration(200)}
					style={[
						styles.exampleView,
						{
							height: 500,
							width: '100%',
							backgroundColor: 'blue'
						}
					]}
				>
					<Text variant='paragraph-large-medium' color='text.negative.p'>
						Index: 1/{sequenceApi.numItems}
					</Text>
				</View>
				<View
					layout={LinearTransition.duration(200)}
					style={[
						styles.exampleView,
						{
							height: 200,
							width: '100%',
							backgroundColor: 'green'
						}
					]}
				>
					<Text variant='paragraph-large-medium' color='text.negative.p'>
						Index: 2/{sequenceApi.numItems}
					</Text>
				</View>
			</Sequence>
			<View
				margin='m'
				flexDirection='row'
				marginBottom='xxl'
				animated
				layout={LinearTransition.duration(200)}
			>
				<View marginRight='s' flex={1}>
					<Button text='back' onPress={sequenceApi.back} />
				</View>
				<View marginLeft='s' flex={1}>
					<Button text='next' onPress={sequenceApi.next} />
				</View>
			</View>
			<View margin='m' animated layout={LinearTransition.duration(200)}>
				<TabToggler
					defaultActiveTab={sequenceApi.sequenceIndex}
					onChange={(id: number) => sequenceApi.goTo(id)}
					data={[
						{ text: 'anything', id: 0 },
						{ text: 'tags', id: 1 },
						{ text: 'artists', id: 2 }
					]}
				/>
			</View>
			<View
				margin='m'
				flexDirection='row'
				justifyContent='center'
				animated
				layout={LinearTransition.duration(200)}
			>
				<Text>Current Index: {sequenceApi.sequenceIndex}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	exampleView: {
		height: 200,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default FadeInOutSequence;
