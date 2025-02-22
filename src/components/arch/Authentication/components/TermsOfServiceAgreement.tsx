import { Text, View } from '@atomic';
import { useSheet } from '@hooks';
import { Checkbox } from '@molecules';
import { TermsOfServiceBottomSheet } from '@popups';
import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface TermsOfServiceAgreementProps {
	checked: boolean;
	onPress: () => void;
}

const TermsOfServiceAgreement: React.FC<TermsOfServiceAgreementProps> = ({
	checked,
	onPress
}) => {
	const sheetApi = useSheet();
	return (
		<View>
			<Checkbox
				title='I Accept the Terms of Service'
				subtitle={
					<Text variant='paragraph-small' color='text.s'>
						Read our{' '}
						<TouchableWithoutFeedback
							onPress={() => {
								Keyboard.dismiss();
								sheetApi.open();
							}}
						>
							<Text
								variant='paragraph-small'
								color='text.p'
								textDecorationLine='underline'
							>
								Terms of Service
							</Text>
						</TouchableWithoutFeedback>
					</Text>
				}
				checked={checked}
				onPress={onPress}
			/>
			<TermsOfServiceBottomSheet sheetApi={sheetApi} />
		</View>
	);
};

export default TermsOfServiceAgreement;
