import { View } from '@atomic';
import { SelfAwareScrollView, useSelfAwareScrollView } from '@molecules';
import React, { useRef } from 'react';
import { TextInput, TouchableWithoutFeedback } from 'react-native';

const randomColor = () =>
	'#' + Math.floor(Math.random() * 16777215).toString(16);

const Scrollto = () => {
	const selfAwareScrollViewApi = useSelfAwareScrollView();
	return (
		<SelfAwareScrollView selfAwareScrollViewApi={selfAwareScrollViewApi}>
			{Array.from({ length: 50 }).map((_, i) => {
				const ref = useRef(null);
				return (
					<TouchableWithoutFeedback
						key={i}
						onPress={() => selfAwareScrollViewApi.onPressScrollViewElement(ref)}
					>
						<View
							ref={ref}
							style={{ height: 100, backgroundColor: randomColor() }}
						>
							<TextInput
								placeholder='Press me'
								style={{ flex: 1 }}
								onFocus={() =>
									selfAwareScrollViewApi.onPressScrollViewElement(ref)
								}
							/>
						</View>
					</TouchableWithoutFeedback>
				);
			})}
		</SelfAwareScrollView>
	);
};

export default Scrollto;
