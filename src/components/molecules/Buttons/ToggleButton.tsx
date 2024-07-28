import { useTheme } from '@hooks';
import _ from 'lodash';
import React, { useMemo, useState } from 'react';
import Button from './Button';

interface ToggleButtonProps {
	defaultState?: boolean;
	onChange?: (isActive: boolean) => void;
	inactiveButtonProps?: Omit<React.ComponentProps<typeof Button>, 'onPress'>;
	activeButtonProps?: Omit<React.ComponentProps<typeof Button>, 'onPress'>;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
	defaultState = false,
	inactiveButtonProps,
	activeButtonProps,
	onChange
}) => {
	const { theme } = useTheme();
	const [isActive, setIsActive] = useState(defaultState);

	const _buttonProps = useMemo(() => {
		const _activeButtonProps = _.merge(
			{
				text: 'Inactive',
				buttonThemeSettings: {
					backgroundColor: 'bg.s',
					borderColor: 'border.medium',
					borderWidth: theme.borderWidth.normal,
					textColor: 'text.s'
				},
				buttonContent: {}
			},
			inactiveButtonProps
		);

		const _inactiveButtonProps = _.merge(
			{
				text: 'Active',
				buttonThemeSettings: {
					backgroundColor: 'button.solid.active.bg.default',
					borderColor: 'border.light',
					borderWidth: theme.borderWidth.thin,
					textColor: 'button.solid.active.text.default'
				},
				buttonContent: {}
			},
			activeButtonProps
		);

		return isActive ? _activeButtonProps : _inactiveButtonProps;
	}, [isActive, activeButtonProps, inactiveButtonProps, theme]);

	const _onPress = () => {
		onChange && onChange(!isActive);
		setIsActive(!isActive);
	};

	return <Button {..._buttonProps} onPress={_onPress} />;
};

export default ToggleButton;
