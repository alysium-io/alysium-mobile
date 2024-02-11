import imagesApiSlice from 'src/redux/api/imagesApiSlice'
import useUser from './useUser'
import { ApiIdentifier, UploadImageProps } from '@types'


const {
    useUploadImageMutation
} = imagesApiSlice


interface IUseImages {
    uploadUserProfileImage: (imageProps: UploadImageProps) => void
    uploadEventImage: (eventId: ApiIdentifier, imageProps: UploadImageProps) => void
}

const useImages = () : IUseImages => {

    const { user } = useUser()

    const [ redux_uploadImage ] = useUploadImageMutation()

    const uploadImage = (field: string, ref: string, refId: string, files: UploadImageProps) => {
        const form = new FormData()
        form.append('field', field)
        form.append('ref', ref)
        form.append('refId', refId)
        form.append('files', files)
        redux_uploadImage(form)
    }

    const uploadUserProfileImage = (imageProps: UploadImageProps) => {
        if (user.user?.id) {
            uploadImage(
                'profile_picture',
                'plugin::users-permissions.user',
                user.user?.id.toString(),
                imageProps
            )
        }
    }

    const uploadEventImage = (eventId: ApiIdentifier, imageProps: UploadImageProps) => {
        uploadImage(
            'image',
            'api::event.event',
            eventId.toString(),
            imageProps
        )
    }
    
    return {
        uploadUserProfileImage,
        uploadEventImage
    }
}

export default useImages