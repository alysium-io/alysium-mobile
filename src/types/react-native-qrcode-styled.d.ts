// react-native-qrcode-styled.d.ts

declare module 'react-native-qrcode-styled' {
	import type React from 'react';
	import type { ColorValue } from 'react-native';
	import type {
		PathProps,
		ImageProps as SVGImageProps,
		SvgProps
	} from 'react-native-svg';

	export type QRCodeMessage = string;

	export interface QRCodeOptions {
		version?: number;
		errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
		maskPattern?: number;
		toSJISFunc?: () => number;
	}

	export type GradientOrigin = [number, number];
	export type GradientType = 'linear' | 'radial';

	export type LinearGradientProps = {
		colors?: ColorValue[];
		start?: [number, number];
		end?: [number, number];
		locations?: number[];
	};

	export type RadialGradientProps = {
		colors?: ColorValue[];
		center?: [number, number];
		radius?: [number, number];
		locations?: number[];
	};

	export type GradientProps = {
		type?: GradientType;
		options?: LinearGradientProps | RadialGradientProps;
	};

	export type CornerType = 'rounded' | 'cut';
	export type BorderRadius = number | number[];
	export type Bit = 0 | 1;
	export type BitArray = Bit[];
	export type BitMatrix = BitArray[];

	export type PieceOptions = {
		pieceSize?: number;
		pieceScale?: PathProps['scale'];
		pieceRotation?: string | number;
		pieceCornerType?: CornerType;
		pieceBorderRadius?: BorderRadius;
		pieceStroke?: ColorValue;
		pieceStrokeWidth?: number;
		color?: ColorValue;
		gradient?: GradientProps;
	};

	export type EyePosition = 'topLeft' | 'topRight' | 'bottomLeft';

	export type EyeOptions = {
		scale?: PathProps['scale'];
		rotation?: string | number;
		borderRadius?: BorderRadius;
		color?: ColorValue;
		gradient?: GradientProps;
		stroke?: ColorValue;
		strokeWidth?: number;
	};

	export type AllEyesOptions = { [K in EyePosition]?: EyeOptions };

	export type RenderCustomPieceItem = ({
		x,
		y,
		pieceSize,
		qrSize,
		bitMatrix
	}: {
		x: number;
		y: number;
		pieceSize: number;
		qrSize: number;
		bitMatrix: BitMatrix;
	}) => React.ReactElement | null;

	export type LogoArea = {
		x: number;
		y: number;
		width: number;
		height: number;
	};

	export type LogoOptions = {
		hidePieces?: boolean;
		padding?: number;
		scale?: number;
		onChange?: (logoArea?: LogoArea) => void;
	} & SVGImageProps;

	export interface SVGGradientProps extends GradientProps {
		id: string;
		size?: number;
		origin?: GradientOrigin;
	}

	export interface SVGQRCodeStyledProps
		extends QRCodeOptions,
			PieceOptions,
			Omit<SvgProps, 'children'> {
		data?: QRCodeMessage;
		onChangeSize?: (size: number) => void;
		pieceLiquidRadius?: number;
		outerEyesOptions?: EyeOptions | AllEyesOptions;
		innerEyesOptions?: EyeOptions | AllEyesOptions;
		renderCustomPieceItem?: RenderCustomPieceItem;
		isPiecesGlued?: boolean;
		padding?: number;
		backgroundImage?: SVGImageProps;
		logo?: LogoOptions;
		children?: (
			pieceSize: number,
			bitMatrix: BitMatrix
		) => SvgProps['children'];
		renderBackground?: (
			pieceSize: number,
			bitMatrix: BitMatrix
		) => SvgProps['children'];
	}

	export function useQRCodeData(
		data: QRCodeMessage,
		options?: QRCodeOptions
	): { qrCodeSize: number; bitMatrix: BitMatrix };

	export const SVGGradient: React.FC<SVGGradientProps>;

	export function isCoordsOfOuterEyes(x: number, y: number): boolean;
	export function isCoordsOfInnerEyes(x: number, y: number): boolean;
	export function isCoordsOfTopRightOuterEye(x: number, y: number): boolean;
	export function isCoordsOfTopRightInnerEye(x: number, y: number): boolean;
	export function isCoordsOfTopLeftOuterEye(x: number, y: number): boolean;
	export function isCoordsOfTopLeftInnerEye(x: number, y: number): boolean;
	export function isCoordsOfBottomLeftOuterEye(x: number, y: number): boolean;
	export function isCoordsOfBottomLeftInnerEye(x: number, y: number): boolean;

	const QRCode: React.ForwardRefExoticComponent<
		SVGQRCodeStyledProps & React.RefAttributes<import('react-native-svg').Svg>
	>;
	export default QRCode;
}
