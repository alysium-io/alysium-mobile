import { Section, Text, View } from '@atomic';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import {
	FullScreenSheet,
	FullScreenSheetScrollView,
	FullScreenSheetStandardHeader
} from '@organisms';
import FullScreenSheetFooter from '@src/components/organisms/BottomSheet/sheets/FullScreenSheetFooter';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import React, { useCallback } from 'react';
import SectionBody from './components/SectionBody';
import SectionTitle from './components/SectionTitle';

interface PrivacyPolicyBottomSheetProps {
	sheetApi: SheetApi;
}

const PrivacyPolicyBottomSheet: React.FC<PrivacyPolicyBottomSheetProps> = ({
	sheetApi
}) => {
	const { behavior } = useBehaviorContext();
	const sheetDidOpen = () => {
		behavior('POPUP_PRIVACY_POLICY');
	};

	const footerComponent = useCallback(
		(props: BottomSheetFooterProps) => (
			<FullScreenSheetFooter {...props}>
				<View flex={1}>
					<Button text='Dismiss' onPress={sheetApi.close} />
				</View>
			</FullScreenSheetFooter>
		),
		[]
	);

	return (
		<FullScreenSheet
			sheetApi={sheetApi}
			footerComponent={footerComponent}
			sheetDidOpen={sheetDidOpen}
		>
			<FullScreenSheetStandardHeader />
			<FullScreenSheetScrollView>
				<View margin='m'>
					<Section>
						<Text variant='page-header' marginBottom='s'>
							Privacy Policy
						</Text>
						<Text variant='paragraph-small'>
							Please read this Privacy Policy carefully before using this
							application.
						</Text>
					</Section>
					<Section>
						<SectionTitle>1. Introduction</SectionTitle>
						<SectionBody>
							Alysium is committed to protecting the privacy of our users. This
							Privacy Policy explains how we collect, use, and safeguard your
							personal information when you use our mobile application and
							related services.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>2. Information We Collect</SectionTitle>
						<SectionBody>
							We collect the following personal information when you create an
							account:
							{'\n'}- Name
							{'\n'}- Phone number or Email address
							{'\n'}We do not collect any additional data beyond these three
							pieces of information.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>3. How We Use Your Information</SectionTitle>
						<SectionBody>
							We use the information we collect solely for the purpose of
							providing and improving our Service. This includes:
							{'\n'}- Creating and managing your account
							{'\n'}- Communicating with you about your account or the Service
							{'\n'}- Improving and optimizing our Service
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>4. Data Retention</SectionTitle>
						<SectionBody>
							We retain your personal information for as long as you maintain an
							active account with Alysium. Upon deletion of your account, all
							your personal information is permanently destroyed.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>5. Data Sharing and Third Parties</SectionTitle>
						<SectionBody>
							We do not share your personal information with any third parties.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>6. Cookies and Tracking</SectionTitle>
						<SectionBody>
							We do not use cookies for tracking. We use JSON Web Tokens (JWTs)
							solely for the purpose of identifying users while they are logged
							into our platform. These tokens are not used to track users
							outside of our Service.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>7. Data Security</SectionTitle>
						<SectionBody>
							We implement reasonable security measures to protect your personal
							information. However, please be aware that no method of
							transmission over the Internet or method of electronic storage is
							100% secure.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>8. Your Rights and Choices</SectionTitle>
						<SectionBody>
							You have the right to access, correct, or delete your personal
							information. You can modify your data in the profile tab of your
							account page within our Service.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>9. Children's Privacy</SectionTitle>
						<SectionBody>
							Our Service is not directed to children under the age of 13, and
							we do not knowingly collect personal information from children
							under 13.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>10. Changes to This Privacy Policy</SectionTitle>
						<SectionBody>
							We may update our Privacy Policy from time to time. We will notify
							you of any changes by posting the new Privacy Policy on this page
							and updating the "Last Updated" date.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>11. Contact Us</SectionTitle>
						<SectionBody>
							If you have any questions about this Privacy Policy, please
							contact us at{' '}
							<Text
								color='hyperlink.text.p'
								textDecorationLine='underline'
								variant='paragraph-small-light'
							>
								alec@alysium.io
							</Text>
						</SectionBody>
					</Section>

					<Text variant='paragraph-small' textAlign='right'>
						Aug. 1st, 2024
					</Text>
				</View>
			</FullScreenSheetScrollView>
		</FullScreenSheet>
	);
};

export default PrivacyPolicyBottomSheet;
