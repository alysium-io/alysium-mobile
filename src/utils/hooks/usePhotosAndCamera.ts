import { launchImageLibrary, launchCamera, ImagePickerResponse } from 'react-native-image-picker'
import { check, PERMISSIONS, PermissionStatus, request, RESULTS } from 'react-native-permissions'
import { Alert, Platform } from 'react-native'


interface IUsePhotosAndCamera {
    chooseImageOrTakeNewPhoto: () => Promise<string | null>
}

const usePhotosAndCamera = () : IUsePhotosAndCamera => {

    const handleApiResolve = async (fn: () => any, resolve: any) => {
        try {
            const result = await fn()
            resolve(result)
        } catch (err) {
            resolve(err)
        }
    }

    const requestPhotosOrCameraForImage = async () : Promise<string | null> => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                'Select Image',
                'Choose an image from library or take a new one',
                [
                    {
                        text: 'Camera',
                        onPress: () => handleApiResolve(takePictureWithCamera, resolve)
                    },
                    {
                        text: 'Library',
                        onPress: () => handleApiResolve(chooseImageFromLibrary, resolve)
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => resolve(null)
                    },
                ],
                {
                    cancelable: true,
                    userInterfaceStyle: 'dark'
                },
            )
        })
    }

    const requestCameraPermissions = async () : Promise<PermissionStatus> => request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
    const requestPhotosPermissions = async () : Promise<PermissionStatus> => check(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)

    const chooseImageFromLibrary = async () : Promise<string | null> => {
        try {
            const permissionResult = await requestPhotosPermissions()
            if (permissionResult === RESULTS.GRANTED || permissionResult === RESULTS.LIMITED) {
                const result = await launchImageLibrary({ mediaType: 'photo', quality: 1, selectionLimit: 1 })
                return extractUriFromImagePickerResponse(result)
            } else {
                console.log('Permission required')
                return null
            }
        } catch (err) {
            console.log(`Something bad happened: ${err}`)
            return null
        }
    }

    const takePictureWithCamera = async () : Promise<string | null> => {
        try {
            const permissionResult = await requestCameraPermissions()
            if (permissionResult === RESULTS.GRANTED) {
                const result = await launchCamera({ mediaType: 'photo', quality: 1 })
                return extractUriFromImagePickerResponse(result)
            } else {
                console.log('Permission requried')
                return null
            }
        } catch (err) {
            console.log(`Something bad happened: ${err}`)
            return null
        }
    }

    const extractUriFromImagePickerResponse = (result: ImagePickerResponse) : string | null => {
        if (result && result.assets && result.assets[0].uri) {
            return result.assets[0].uri
        } else {
            return null
        }
    }

    const chooseImageOrTakeNewPhoto = async () => {
        return requestPhotosOrCameraForImage()
    }
    
    return {
        chooseImageOrTakeNewPhoto
    }
}

export default usePhotosAndCamera