import { Text, View } from '@atomic';
import { useMapRegionDetection } from '@hooks';
import React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import Animated, {
	AnimatedProps,
	SharedValue,
	useAnimatedProps
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TextProps {
	text: SharedValue<string>;
	style?: AnimatedProps<RNTextProps>['style'];
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const ReText = (props: TextProps) => {
	const { text, style } = { style: {}, ...props };
	const animatedProps = useAnimatedProps(() => {
		return {
			text: text.value
		} as any;
	});
	return (
		<AnimatedTextInput
			underlineColorAndroid='transparent'
			editable={false}
			animatedProps={animatedProps}
			style={[styles.baseStyle, style]}
		/>
	);
};

const GoogleMapTesting = () => {
	const insets = useSafeAreaInsets();
	const {
		region,
		radiusInMeters,
		latitude,
		longitude,
		onRegionChange,
		onRegionChangeComplete
	} = useMapRegionDetection();

	return (
		<View backgroundColor='bg.p' flex={1} style={{ paddingTop: insets.top }}>
			<View marginBottom='m'>
				<Text textAlign='center'>Google Maps</Text>
				<View
					flexDirection='row'
					justifyContent='space-around'
					marginBottom='m'
				>
					<View flex={1}>
						<Text
							variant='paragraph-small'
							color='text.t'
							marginBottom='s'
							textAlign='center'
						>
							Latitude
						</Text>
						<ReText
							text={latitude}
							style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
						/>
					</View>
					<View flex={1}>
						<Text
							variant='paragraph-small'
							color='text.t'
							marginBottom='s'
							textAlign='center'
						>
							Longitude
						</Text>
						<ReText
							text={longitude}
							style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
						/>
					</View>
				</View>
				<View flexDirection='row' justifyContent='space-around'>
					<View flex={1}>
						<Text
							variant='paragraph-small'
							color='text.t'
							marginBottom='s'
							textAlign='center'
						>
							Pin Latitude
						</Text>
						<Text variant='paragraph-medium' textAlign='center'>
							{region.latitude.toFixed(2)}
						</Text>
					</View>
					<View flex={1}>
						<Text
							variant='paragraph-small'
							color='text.t'
							marginBottom='s'
							textAlign='center'
						>
							Pin Longitude
						</Text>
						<Text variant='paragraph-medium' textAlign='center'>
							{region.longitude.toFixed(2)}
						</Text>
					</View>
					<View flex={1}>
						<Text
							variant='paragraph-small'
							color='text.t'
							marginBottom='s'
							textAlign='center'
						>
							Radius (Meters)
						</Text>
						<Text variant='paragraph-medium' textAlign='center'>
							{radiusInMeters?.toFixed(2)}
						</Text>
					</View>
					<View flex={1}>
						<Text
							variant='paragraph-small'
							color='text.t'
							marginBottom='s'
							textAlign='center'
						>
							Radius (Km)
						</Text>
						<Text variant='paragraph-medium' textAlign='center'>
							{(radiusInMeters / 1000).toFixed(2)}
						</Text>
					</View>
				</View>
			</View>
			<MapView
				style={styles.map}
				loadingEnabled={true}
				showsCompass={true}
				showsMyLocationButton={true}
				onRegionChange={onRegionChange}
				onRegionChangeComplete={onRegionChangeComplete}
			>
				<Circle
					center={{
						latitude: region.latitude,
						longitude: region.longitude
					}}
					radius={radiusInMeters}
					fillColor='rgba(100, 100, 255, 0.2)'
					strokeColor='rgba(100, 100, 255, 0.5)'
					strokeWidth={2}
				/>
				<Marker
					coordinate={{
						latitude: region.latitude,
						longitude: region.longitude
					}}
				/>
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	map: {
		flex: 1
	},
	baseStyle: {
		color: 'white'
	}
});

export default GoogleMapTesting;
