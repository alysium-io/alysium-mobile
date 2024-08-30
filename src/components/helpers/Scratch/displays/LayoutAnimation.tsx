import { View } from '@atomic';
import { useToggle } from '@hooks';
import { Button } from '@molecules';
import React from 'react';
import { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

const LayoutAnimation = () => {
	/**
	 * The basic idea here is that all the views that animate in width ALL have to be animated,
	 * otherwise, the views that aren't animated will just snap into place.
	 */
	const { state, toggle } = useToggle();
	const transition = LinearTransition.duration(300);
	return (
		<View>
			{state && (
				<View
					animated
					layout={transition}
					entering={FadeIn}
					exiting={FadeOut}
					style={{
						height: 100,
						width: '100%',
						backgroundColor: 'blue'
					}}
				/>
			)}
			<View
				animated
				layout={transition}
				style={{
					height: 200,
					width: '100%',
					backgroundColor: 'red'
				}}
			/>
			<View style={{ margin: 25 }} animated layout={transition}>
				<Button text='Toggle' onPress={toggle} />
			</View>
		</View>
	);
};

export default LayoutAnimation;
