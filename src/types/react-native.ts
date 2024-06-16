import { LayoutChangeEvent } from 'react-native';

export type ProviderProps = {
	children?: React.ReactNode;
};

export interface IChildrenProps {
	children?: React.ReactNode;
}

export type ChildrenProps = {
	children?: React.ReactNode;
};

export type OnLayout = ((event: LayoutChangeEvent) => void) | undefined;
