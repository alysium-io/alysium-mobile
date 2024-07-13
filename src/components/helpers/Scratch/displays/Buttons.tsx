import { Button, Text, View } from '@atomic';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const RenderButton: React.FC<React.ComponentProps<typeof Button>> = (props) => (
	<View marginBottom='m'>
		<Button {...props} />
	</View>
);

const Buttons = () => {
	return (
		<ScrollView>
			<View margin='m'>
				<View marginBottom='m'>
					<Text variant='section-header-2' marginBottom='m'>
						Solid
					</Text>
					<RenderButton text='Done' variant='solid' color='default' />
					<RenderButton text='Done' variant='solid' color='p' />
					<RenderButton text='Done' variant='solid' color='s' />
					<RenderButton text='Done' variant='solid' color='t' />
					<RenderButton text='Done' variant='solid' color='q' />
					<RenderButton
						text='Disabled'
						variant='solid'
						buttonState='disabled'
					/>
					<RenderButton text='Done' variant='solid' buttonState='loading' />
				</View>
				<View marginBottom='m'>
					<Text variant='section-header-2' marginBottom='m'>
						Outlined
					</Text>
					<RenderButton text='Done' variant='outlined' color='default' />
					<RenderButton text='Done' variant='outlined' color='p' />
					<RenderButton text='Done' variant='outlined' color='s' />
					<RenderButton text='Done' variant='outlined' color='t' />
					<RenderButton text='Done' variant='outlined' color='q' />
					<RenderButton
						text='Disabled'
						variant='outlined'
						buttonState='disabled'
					/>
					<RenderButton text='Done' variant='outlined' buttonState='loading' />
				</View>
			</View>
		</ScrollView>
	);
};

export default Buttons;
