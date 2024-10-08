import { UploadUserImageRequest } from '../interfaces';
export declare class UpdateUserImageDto implements Omit<UploadUserImageRequest, 'image'> {
    userId: number;
    image: any;
}
