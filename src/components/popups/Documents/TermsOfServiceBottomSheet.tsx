import { Section, Text, View } from '@atomic';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import { FullScreenSheetWithHeaderAndFooter } from '@organisms';
import {
	BehaviorAction,
	useBehaviorContext
} from '@src/utils/contexts/Behavior';
import React from 'react';
import SectionBody from './components/SectionBody';
import SectionTitle from './components/SectionTitle';

interface TermsOfServiceBottomSheetProps {
	sheetApi: SheetApi;
}

const TermsOfServiceBottomSheet: React.FC<TermsOfServiceBottomSheetProps> = ({
	sheetApi
}) => {
	const { behavior } = useBehaviorContext();
	const sheetDidOpen = () => {
		behavior(BehaviorAction.POPUP_TERMS_OF_SERVICE);
	};

	const FooterContent = (
		<View flex={1}>
			<Button text='Dismiss' onPress={sheetApi.close} />
		</View>
	);

	return (
		<FullScreenSheetWithHeaderAndFooter
			sheetApi={sheetApi}
			FooterContent={FooterContent}
			sheetDidOpen={sheetDidOpen}
		>
			<View margin='m'>
				<Section>
					<Text variant='page-header' marginBottom='s'>
						Privacy Policy
					</Text>
					<Text variant='paragraph-small'>
						Please read these terms of service carefully before using this
						application.
					</Text>
				</Section>

				<Section>
					<SectionTitle>1. Acceptance of Terms</SectionTitle>
					<SectionBody>
						By accessing or using the Alysium mobile application and related
						services (collectively, the "Service"), you agree to be bound by
						these Terms of Service ("Terms"). If you do not agree to these
						Terms, please do not use the Service.
					</SectionBody>
				</Section>

				<Section>
					<SectionTitle>2. Description of Service</SectionTitle>
					<SectionBody>
						Alysium is a mobile-first Software as a Service (SaaS) company
						providing tools to help Hosts & Artists grow their live music
						business.
					</SectionBody>
				</Section>

				<Section>
					<SectionTitle>3. Eligibility</SectionTitle>
					<SectionBody>
						While there are no strict age restrictions, the Service is primarily
						targeted at users between the ages of 18 and 35. By using the
						Service, you represent that you are at least 18 years old and are
						fully able and competent to enter into the terms, conditions,
						obligations, affirmations, representations, and warranties set forth
						in these Terms.
					</SectionBody>
				</Section>

				<Section>
					<SectionTitle>4. User Accounts</SectionTitle>
					<SectionBody>
						To access certain features of the Service, you may be required to
						create an account. When you create an account, you must provide
						accurate and complete information. You are solely responsible for
						the activity that occurs on your account, and you must keep your
						account password secure.
					</SectionBody>
				</Section>

				<Section>
					<SectionTitle>5. Personal Data</SectionTitle>
					<SectionBody>
						We collect and store certain personal information, including your
						name, email address, and phone number when you create an account.
						Our use and protection of this information is governed by our
						Privacy Policy, which is incorporated into these Terms by reference.
					</SectionBody>
				</Section>

				<Section>
					<SectionTitle>6. Intellectual Property</SectionTitle>
					<SectionBody>
						Alysium and its licensors retain all right, title, and interest in
						and to the Service, including all related intellectual property
						rights. The Service is protected by copyright, trademark, and other
						laws of both the United States and foreign countries.
					</SectionBody>
				</Section>

				<Section>
					<SectionTitle>7. Termination</SectionTitle>
					<SectionBody>
						We may terminate or suspend your access to the Service immediately,
						without prior notice or liability, for any reason whatsoever,
						including without limitation if you breach the Terms. Upon
						termination, your right to use the Service will immediately cease.
					</SectionBody>
				</Section>

				<Section>
					<SectionTitle>8. Disclaimer of Warranties</SectionTitle>
					<SectionBody>
						The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
						Alysium expressly disclaims all warranties of any kind, whether
						express or implied.
					</SectionBody>
				</Section>

				<Section>
					<SectionTitle>9. Limitation of Liability</SectionTitle>
					<SectionBody>
						In no event shall Alysium be liable for any indirect, incidental,
						special, consequential or punitive damages, including without
						limitation, loss of profits, data, use, goodwill, or other
						intangible losses, resulting from your access to or use of or
						inability to access or use the Service.
					</SectionBody>
				</Section>

				<Section>
					<SectionTitle>10. Governing Law</SectionTitle>
					<SectionBody>
						These Terms shall be governed and construed in accordance with the
						laws of the United States, without regard to its conflict of law
						provisions.
					</SectionBody>
				</Section>

				<Section>
					<SectionTitle>11. Arbitration</SectionTitle>
					<SectionBody>
						Any dispute arising from or relating to the subject matter of these
						Terms shall be finally settled by arbitration in California, using
						the English language in accordance with the Arbitration Rules and
						Procedures of JAMS then in effect, by one commercial arbitrator with
						substantial experience in resolving intellectual property and
						commercial contract disputes.
					</SectionBody>
				</Section>

				<Section>
					<SectionTitle>12. Changes to Terms</SectionTitle>
					<SectionBody>
						We reserve the right, at our sole discretion, to modify or replace
						these Terms at any time. If a revision is material we will try to
						provide at least 30 days' notice prior to any new terms taking
						effect.
					</SectionBody>
				</Section>

				<Section>
					<SectionTitle>13. Contact Us</SectionTitle>
					<SectionBody>
						If you have any questions about these Terms, please contact us at{' '}
						<Text
							color='hyperlink.text'
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
		</FullScreenSheetWithHeaderAndFooter>
	);
};

export default TermsOfServiceBottomSheet;
