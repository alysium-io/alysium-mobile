import { ScrollView, Section, Text, View } from '@atomic';
import { SheetApi } from '@hooks';
import { FullScreenSheet } from '@organisms';
import React from 'react';
import SectionBody from './components/SectionBody';
import SectionTitle from './components/SectionTitle';

interface TermsOfServiceBottomSheetProps {
	sheetApi: SheetApi;
}

const TermsOfServiceBottomSheet: React.FC<TermsOfServiceBottomSheetProps> = ({
	sheetApi
}) => {
	return (
		<FullScreenSheet sheetApi={sheetApi}>
			<ScrollView>
				<View margin='m'>
					<Section>
						<Text variant='page-header' marginBottom='s'>
							Terms of Service
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
							While there are no strict age restrictions, the Service is
							primarily targeted at users between the ages of 18 and 35. By
							using the Service, you represent that you are at least 18 years
							old and are fully able and competent to enter into the terms,
							conditions, obligations, affirmations, representations, and
							warranties set forth in these Terms.
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
						<SectionTitle>5. User-Generated Content</SectionTitle>
						<SectionBody>
							The Service allows users to post, share, and interact with
							content, including but not limited to text, images, and other
							materials ("User-Generated Content"). By using the Service, you
							agree to the following:
							{'\n\n'}- **Zero-Tolerance Policy:** Alysium has a zero-tolerance
							policy for objectionable content or abusive behavior, including
							but not limited to hate speech, harassment, violence, explicit
							material, or spam.
							{'\n'}- **Content Moderation:** We reserve the right to monitor,
							filter, and remove any User-Generated Content that violates these
							Terms at our sole discretion.
							{'\n'}- **Reporting Mechanism:** Users may report objectionable
							content through the reporting tools provided in the Service. We
							will review and act on such reports within 24 hours, including
							removing the content and, if warranted, suspending or terminating
							the account of the user responsible.
							{'\n'}- **Blocking Users:** Users may block other users to prevent
							interaction or visibility of their content within the Service.
							{'\n'}- **User Responsibility:** You are solely responsible for
							the User-Generated Content you post and agree not to upload or
							share content that violates these Terms or applicable laws.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>6. Personal Data</SectionTitle>
						<SectionBody>
							We collect and store certain personal information, including your
							name, email address, and phone number when you create an account.
							Our use and protection of this information is governed by our
							Privacy Policy, which is incorporated into these Terms by
							reference.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>7. Intellectual Property</SectionTitle>
						<SectionBody>
							Alysium and its licensors retain all right, title, and interest in
							and to the Service, including all related intellectual property
							rights. The Service is protected by copyright, trademark, and
							other laws of both the United States and foreign countries.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>8. Termination</SectionTitle>
						<SectionBody>
							We may terminate or suspend your access to the Service
							immediately, without prior notice or liability, for any reason
							whatsoever, including without limitation if you breach the Terms,
							such as by posting objectionable User-Generated Content or
							engaging in abusive behavior. Upon termination, your right to use
							the Service will immediately cease.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>9. Disclaimer of Warranties</SectionTitle>
						<SectionBody>
							The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
							Alysium expressly disclaims all warranties of any kind, whether
							express or implied.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>10. Limitation of Liability</SectionTitle>
						<SectionBody>
							In no event shall Alysium be liable for any indirect, incidental,
							special, consequential or punitive damages, including without
							limitation, loss of profits, data, use, goodwill, or other
							intangible losses, resulting from your access to or use of or
							inability to access or use the Service.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>11. Governing Law</SectionTitle>
						<SectionBody>
							These Terms shall be governed and construed in accordance with the
							laws of the United States, without regard to its conflict of law
							provisions.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>12. Arbitration</SectionTitle>
						<SectionBody>
							Any dispute arising from or relating to the subject matter of
							these Terms shall be finally settled by arbitration in California,
							using the English language in accordance with the Arbitration
							Rules and Procedures of JAMS then in effect, by one commercial
							arbitrator with substantial experience in resolving intellectual
							property and commercial contract disputes.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>13. Changes to Terms</SectionTitle>
						<SectionBody>
							We reserve the right, at our sole discretion, to modify or replace
							these Terms at any time. If a revision is material we will try to
							provide at least 30 days' notice prior to any new terms taking
							effect.
						</SectionBody>
					</Section>

					<Section>
						<SectionTitle>14. Contact Us</SectionTitle>
						<SectionBody>
							If you have any questions about these Terms, please contact us at{' '}
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
						February 21st, 2025
					</Text>
				</View>
			</ScrollView>
		</FullScreenSheet>
	);
};

export default TermsOfServiceBottomSheet;
