import { View } from '@atomic';
import React from 'react';

const HandleBar = () => {
	const pieceSize = 3;
	const HandlePiece = () => (
		<View
			backgroundColor='bg.t'
			height={pieceSize}
			width={pieceSize}
			borderRadius='round'
		/>
	);
	return (
		<View flexDirection='row' gap='xs'>
			<View gap='xs'>
				<HandlePiece />
				<HandlePiece />
				<HandlePiece />
			</View>
			<View gap='xs'>
				<HandlePiece />
				<HandlePiece />
				<HandlePiece />
			</View>
		</View>
	);
};

export default HandleBar;
