import { LView, View } from '@atomic';
import { useToggle } from '@hooks';
import { Button } from '@molecules';
import React from 'react';

const LayoutAnimation = () => {
	/**
	 * The basic idea here is that all the views that animate in width ALL have to be animated,
	 * otherwise, the views that aren't animated will just snap into place.
	 */
	const { state, toggle } = useToggle();
	return (
		<View>
			{state && (
				<LView
					style={{
						height: 100,
						width: '100%',
						backgroundColor: 'blue'
					}}
				/>
			)}
			<LView
				style={{
					height: 200,
					width: '100%',
					backgroundColor: 'red'
				}}
			/>
			<LView style={{ margin: 25 }}>
				<Button text='Toggle' onPress={toggle} />
			</LView>
		</View>
	);
};

export default LayoutAnimation;
