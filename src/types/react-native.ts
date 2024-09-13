import { LayoutChangeEvent } from 'react-native';

export type ProviderProps = {
	children?: React.ReactNode;
};

export interface IChildrenProps {
	children?: React.ReactNode | React.ReactNode[];
}

export type ChildrenProps = {
	children?: React.ReactNode | React.ReactNode[];
};

export type OnLayout = ((event: LayoutChangeEvent) => void) | undefined;

export type Props<T extends React.ComponentType<any>> = React.ComponentProps<T>;
