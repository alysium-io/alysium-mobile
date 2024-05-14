import React from 'react';
import {
	Platform,
	KeyboardAvoidingView as RNKeyboardAvoidingView
} from 'react-native';

interface KeyboardAvoidingViewProps {
	children?: React.ReactNode;
}

const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({
	children
}) => {
	return (
		<RNKeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}
		>
			{children}
		</RNKeyboardAvoidingView>
	);
};

export default KeyboardAvoidingView;
