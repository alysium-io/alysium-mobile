import { ReportedContentType } from '@flux/api/reported-content/types';
import { createUseContextHook, useSheet } from '@hooks';
import React, { createContext, useCallback } from 'react';
import ReportContentBottomSheet from './ReportContentBottomSheet';

type ReportedContentParams = {
	referenceType: ReportedContentType;
	referenceUid: string;
};

interface ReportedContentContextType {
	openReportSheet: (params: ReportedContentParams) => void;
}

const ReportedContentContext = createContext({} as ReportedContentContextType);

export const ReportedContentProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const sheetApi = useSheet();
	const [reportParams, setReportParams] =
		React.useState<ReportedContentParams | null>(null);

	const openReportSheet = useCallback(
		(params: ReportedContentParams) => {
			setReportParams(params);
			sheetApi.open();
		},
		[sheetApi]
	);

	return (
		<ReportedContentContext.Provider value={{ openReportSheet }}>
			{children}
			<ReportContentBottomSheet
				sheetApi={sheetApi}
				referenceType={reportParams?.referenceType}
				referenceUid={reportParams?.referenceUid}
			/>
		</ReportedContentContext.Provider>
	);
};

export const useReportedContentContext =
	createUseContextHook<ReportedContentContextType>(
		ReportedContentContext,
		'ReportedContentContext'
	);
