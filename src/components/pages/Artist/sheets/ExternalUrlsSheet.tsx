import { ExternalUrl } from '@flux/api/external-url/external-url.entity';
import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useClipboard, useLinking, useTheme } from '@hooks';
import { MenuListItemWithButton } from '@molecules';
import { BottomSheet, BottomSheetHeader } from '@organisms';
import { getIconFromUrl } from '@src/etc/domains';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ExternalUrlsSheetProps {
	sheetApi: SheetApi;
	externalUrls: ExternalUrl[];
}

const ExternalUrlsSheet: React.FC<ExternalUrlsSheetProps> = ({
	sheetApi,
	externalUrls
}) => {
	const insets = useSafeAreaInsets();
	const { go } = useLinking();
	const { theme } = useTheme();
	const { copy } = useClipboard();

	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} snapPoints={['50%']}>
			<BottomSheetView
				style={{
					flex: 1,
					marginBottom: insets.bottom
				}}
			>
				<BottomSheetHeader textAlign='center'>Links</BottomSheetHeader>
				<BottomSheetScrollView>
					{externalUrls.map((externalUrl) => (
						<MenuListItemWithButton
							key={externalUrl.external_url_uid}
							onPress={() => go(externalUrl.url)}
							onPressButton={() => copy(externalUrl.url)}
							buttonIconProps={{
								name: 'link'
							}}
							buttonIconContainerProps={{
								backgroundColor: 'bg.light',
								aspectRatio: 1,
								borderRadius: 'round',
								borderColor: 'border.light',
								borderWidth: theme.borderWidth.thin
							}}
							prefixIconProps={{
								name: getIconFromUrl(externalUrl.url)
							}}
							titleTextProps={{
								title: externalUrl.name,
								bottomSubtext: externalUrl.url,
								titleVariant: 'paragraph-medium',
								bottomSubtextVariant: 'paragraph-tiny',
								bottomSubtextColor: 'text.q'
							}}
						/>
					))}
				</BottomSheetScrollView>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default ExternalUrlsSheet;
