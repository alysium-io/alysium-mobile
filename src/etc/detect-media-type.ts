import { MediaType } from '@flux/api/media/types';
import { Asset } from 'react-native-image-picker';

// Common MIME types for images and videos
const IMAGE_MIME_TYPES = [
	// Standard web image formats
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/gif',
	'image/webp',
	'image/svg+xml',
	// Raw camera formats
	'image/x-canon-cr2',
	'image/x-canon-crw',
	'image/x-nikon-nef',
	'image/x-sony-arw',
	'image/x-adobe-dng',
	// Additional formats
	'image/heic',
	'image/heif',
	'image/avif',
	'image/tiff',
	'image/bmp',
	'image/x-icon',
	'image/vnd.microsoft.icon',
	// Generic
	'image/*'
];

const VIDEO_MIME_TYPES = [
	// Common web video formats
	'video/mp4',
	'video/mpeg',
	'video/ogg',
	'video/webm',
	'video/3gpp',
	'video/3gpp2',
	// Apple formats
	'video/quicktime',
	'video/x-m4v',
	// Microsoft formats
	'video/x-ms-wmv',
	'video/x-ms-asf',
	'video/x-msvideo',
	// Additional formats
	'video/x-matroska',
	'video/x-flv',
	'video/avi',
	'video/divx',
	// Generic
	'video/*'
];

export const getMediaType = (mimeType: string): MediaType | undefined => {
	// Convert to lowercase for case-insensitive comparison
	const normalizedMimeType = mimeType.toLowerCase();

	// Check if it starts with 'image/' or 'video/'
	if (normalizedMimeType.startsWith('image/')) return MediaType.image;
	if (normalizedMimeType.startsWith('video/')) return MediaType.video;

	// If not using the prefix pattern, check against known types
	if (IMAGE_MIME_TYPES.includes(normalizedMimeType)) return MediaType.image;
	if (VIDEO_MIME_TYPES.includes(normalizedMimeType)) return MediaType.video;

	return undefined;
};

// Alternative approach using file extensions
const IMAGE_EXTENSIONS = new Set([
	'jpg',
	'jpeg',
	'png',
	'gif',
	'webp',
	'svg',
	'heic',
	'heif',
	'avif',
	'tiff',
	'bmp',
	'ico',
	'cr2',
	'crw',
	'nef',
	'arw',
	'dng'
]);

const VIDEO_EXTENSIONS = new Set([
	'mp4',
	'mpeg',
	'mpg',
	'ogg',
	'webm',
	'3gp',
	'3g2',
	'mov',
	'm4v',
	'wmv',
	'asf',
	'avi',
	'mkv',
	'flv',
	'divx',
	'qt'
]);

export const getMediaTypeFromFilename = (
	filename: string
): MediaType | undefined => {
	const extension = filename.split('.').pop()?.toLowerCase();
	if (!extension) return undefined;

	if (IMAGE_EXTENSIONS.has(extension)) return MediaType.image;
	if (VIDEO_EXTENSIONS.has(extension)) return MediaType.video;

	return undefined;
};

// Combined function that tries both approaches
export const detectMediaType = (
	mimeType?: string,
	filename?: string
): MediaType | undefined => {
	// Try MIME type first if available
	if (mimeType) {
		const typeFromMime = getMediaType(mimeType);
		if (typeFromMime !== undefined) return typeFromMime;
	}

	// Fall back to filename if available
	if (filename) {
		return getMediaTypeFromFilename(filename);
	}

	return undefined;
};

export const getAssetMediaType = (asset: Asset): MediaType | undefined => {
	return detectMediaType(asset.type, asset.fileName);
};
