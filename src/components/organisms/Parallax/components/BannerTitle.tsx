import { LinearGradient, Text, View } from '@atomic';
import React from 'react';

interface BannerTitleProps {
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	showGradient?: boolean;
}

const BannerTitle: React.FC<BannerTitleProps> = ({
	title,
	titleAlign = 'left',
	showGradient = true
}) => {
	return (
		<View height='100%' width='100%'>
			<LinearGradient
				colors={[
					'rgba(0, 0, 0, 0)',
					showGradient ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0)'
				]}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={{
					width: '100%',
					height: '100%',
					justifyContent: 'flex-end'
				}}
			>
				<Text
					variant='page-header'
					color={showGradient ? 'palette.neutral.p1' : 'palette.neutral.p9'}
					textAlign={titleAlign}
					margin='m'
				>
					{title}
				</Text>
			</LinearGradient>
		</View>
	);
};

export default BannerTitle;
