import { useNavigation } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import React from 'react';

interface ScenePageHeaderProps {
	title: string;
	subtitle: string;
}

const ScenePageHeader: React.FC<ScenePageHeaderProps> = ({
	title,
	subtitle
}) => {
	const { back } = useNavigation();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
				CenterComponent={
					<HeaderTitle
						title={title}
						titleProps={{
							variant: 'paragraph-small',
							textAlign: 'center',
							marginBottom: 'xs'
						}}
						subtitle={subtitle}
						subtitleProps={{ textAlign: 'center' }}
					/>
				}
			/>
		</Header>
	);
};

export default ScenePageHeader;
