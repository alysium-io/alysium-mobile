import { rtkBaseUrl, serviceApi } from '../base';
import {
	CreateContactBodyDto,
	CreateContactParamsDto,
	CreateContactResponseDto
} from './dto/contact-create.dto';
import {
	DeleteContactParamsDto,
	DeleteContactResponseDto
} from './dto/contact-delete.dto';
import {
	FindOneContactParamsDto,
	FindOneContactResponseDto
} from './dto/contact-find-one.dto';
import {
	UpdateContactBodyDto,
	UpdateContactParamsDto,
	UpdateContactResponseDto
} from './dto/contact-update.dto';

const url = rtkBaseUrl('contact');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		createContact: builder.mutation<
			CreateContactResponseDto,
			{ params: CreateContactParamsDto; body: CreateContactBodyDto }
		>({
			query: ({ params, body }) => ({
				url: url(`/artist/${params.artist_uid}`),
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'PrivateArtist', id: 'CURRENT' }
			]
		}),
		updateContact: builder.mutation<
			UpdateContactResponseDto,
			{ params: UpdateContactParamsDto; body: UpdateContactBodyDto }
		>({
			query: ({ params, body }) => ({
				url: url(`/${params.contact_uid}/artist/${params.artist_uid}`),
				method: 'PUT',
				body
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'PrivateArtist', id: 'CURRENT' }
			]
		}),
		deleteContact: builder.mutation<
			DeleteContactResponseDto,
			{ params: DeleteContactParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.contact_uid}/artist/${params.artist_uid}`),
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'PrivateArtist', id: 'CURRENT' }
			]
		}),
		findOneContact: builder.query<
			FindOneContactResponseDto,
			{ params: FindOneContactParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.contact_uid}/artist/${params.artist_uid}`),
				method: 'GET'
			})
		})
	})
});
