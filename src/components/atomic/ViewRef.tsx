import React, { forwardRef, PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';

// Define the props type for our MeasurableView
type MeasurableViewProps = PropsWithChildren<ViewProps>;

// Define the type for the ref
type MeasurableViewRef = View;

const ViewRef = forwardRef<MeasurableViewRef, MeasurableViewProps>(
	({ ...props }, ref) => <View ref={ref} {...props} />
);

ViewRef.displayName = 'ViewRef';

export default ViewRef;
