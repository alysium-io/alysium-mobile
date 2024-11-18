import { Vibrator } from '@etc';
import { ToggleApi, useTheme, useToggle } from '@hooks';
import { Props } from '@types';
import _ from 'lodash';
import React, { useMemo } from 'react';
import Button from './Button';

interface ToggleButtonProps {
	defaultState?: boolean;
	onChange?: (isActive: boolean) => void;
	inactiveButtonProps?: Omit<Props<typeof Button>, 'onPress'>;
	activeButtonProps?: Omit<Props<typeof Button>, 'onPress'>;
	toggleApi?: ToggleApi;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
	defaultState = false,
	inactiveButtonProps,
	activeButtonProps,
	onChange,
	toggleApi
}) => {
	const { theme } = useTheme();
	const _toggleApi = toggleApi || useToggle(defaultState);

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

		return _toggleApi.state ? _activeButtonProps : _inactiveButtonProps;
	}, [_toggleApi, activeButtonProps, inactiveButtonProps, theme]);

	const _onPress = () => {
		_toggleApi.toggle();
		Vibrator.notificationWarning();
		onChange && onChange(!_toggleApi.state);
	};

	return <Button {..._buttonProps} onPress={_onPress} />;
};

export default ToggleButton;
