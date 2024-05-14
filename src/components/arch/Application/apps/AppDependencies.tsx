import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';

interface AppDependenciesProps {
	children: React.ReactNode;
}

const AppDependencies: React.FC<AppDependenciesProps> = ({ children }) => {
	return <BottomSheetModalProvider>{children}</BottomSheetModalProvider>;
};

export default AppDependencies;
