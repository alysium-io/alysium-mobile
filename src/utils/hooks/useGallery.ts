import { galleryApiSlice } from '@flux/api/gallery';
import { GalleryRefType } from '@flux/api/gallery/types';

interface IUseGallery {
	create:
		| typeof galleryApiSlice.useCreateArtistGalleryItemMutation
		| typeof galleryApiSlice.useCreateArtistEventGalleryItemMutation;
	delete:
		| typeof galleryApiSlice.useDeleteArtistGalleryItemMutation
		| typeof galleryApiSlice.useDeleteArtistEventGalleryItemMutation;
	find:
		| typeof galleryApiSlice.useFindArtistGalleryQuery
		| typeof galleryApiSlice.useFindArtistEventGalleryQuery;
	findItem:
		| typeof galleryApiSlice.useFindArtistGalleryItemQuery
		| typeof galleryApiSlice.useFindArtistEventGalleryItemQuery;
	reduxTag: string;
}

const useGallery = (galleryRefType: GalleryRefType): IUseGallery => {
	const creates: Record<
		GalleryRefType,
		| typeof galleryApiSlice.useCreateArtistGalleryItemMutation
		| typeof galleryApiSlice.useCreateArtistEventGalleryItemMutation
	> = {
		[GalleryRefType.artist]: galleryApiSlice.useCreateArtistGalleryItemMutation,
		[GalleryRefType.artistEvent]:
			galleryApiSlice.useCreateArtistEventGalleryItemMutation
	};

	const deletes: Record<
		GalleryRefType,
		| typeof galleryApiSlice.useDeleteArtistGalleryItemMutation
		| typeof galleryApiSlice.useDeleteArtistEventGalleryItemMutation
	> = {
		[GalleryRefType.artist]: galleryApiSlice.useDeleteArtistGalleryItemMutation,
		[GalleryRefType.artistEvent]:
			galleryApiSlice.useDeleteArtistEventGalleryItemMutation
	};

	const findQueries = {
		[GalleryRefType.artist]: galleryApiSlice.useFindArtistGalleryQuery,
		[GalleryRefType.artistEvent]: galleryApiSlice.useFindArtistEventGalleryQuery
	};

	const findItemQueries = {
		[GalleryRefType.artist]: galleryApiSlice.useFindArtistGalleryItemQuery,
		[GalleryRefType.artistEvent]:
			galleryApiSlice.useFindArtistEventGalleryItemQuery
	};

	const reduxTags = {
		[GalleryRefType.artist]: 'ArtistGallery',
		[GalleryRefType.artistEvent]: 'ArtistEventGallery'
	};

	return {
		create: creates[galleryRefType],
		delete: deletes[galleryRefType],
		find: findQueries[galleryRefType],
		findItem: findItemQueries[galleryRefType],
		reduxTag: reduxTags[galleryRefType]
	};
};

export default useGallery;
