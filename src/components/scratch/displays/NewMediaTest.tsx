import { Image, LView, Section, Text, View } from '@atomic';
import { useTheme } from '@hooks';
import { Button } from '@molecules';
import BigUploadMediaButton from '@src/components/pages/ManageEvent/components/EventMediaSection/BigUploadMediaButton';
import useUploadBulkMedia, {
	DynamicMediaProps
} from '@src/utils/hooks/useUploadBulkMedia';
import React from 'react';
import { FlatList } from 'react-native';

const Square: React.FC<DynamicMediaProps> = ({
	state,
	uri,
	type,
	eventMedia
}) => {
	const { theme } = useTheme();
	return (
		<View
			borderRadius='xl'
			overflow='hidden'
			borderWidth={theme.borderWidth.normal}
			borderColor='border.light'
			backgroundColor='bg.negative.p'
			style={{
				width: 125,
				height: 125
			}}
		>
			<Image
				source={{ uri }}
				style={{ width: '100%', height: '100%' }}
				resizeMode='cover'
			/>
		</View>
	);
};

const NewMediaTest = () => {
	const { squares, onPressBulkUpload, clear, isEmpty, numSquaresLoading } =
		useUploadBulkMedia('123');
	const { theme } = useTheme();

	return (
		<View>
			<Section rowGap='m'>
				<LView>
					<Text variant='section-header-2' paddingHorizontal='m'>
						Media
					</Text>
				</LView>
				<LView>
					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						data={squares}
						contentContainerStyle={{
							gap: theme.spacing.m,
							paddingHorizontal: theme.spacing.m
						}}
						renderItem={({ item }) => <Square {...item} />}
					/>
				</LView>
				<LView marginHorizontal='m'>
					<BigUploadMediaButton isEmpty={isEmpty} onPress={onPressBulkUpload} />
				</LView>
				<Text variant='section-header-2' margin='m' textAlign='center'>
					{numSquaresLoading}
				</Text>
			</Section>
			<LView marginHorizontal='m'>
				<Button text='Clear' onPress={clear} />
			</LView>
		</View>
	);
};

export default NewMediaTest;
