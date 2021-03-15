// import * as firebase from 'firebase-admin';
import { Storage } from '@google-cloud/storage';

class StorageService {

    saveProfileImg(userId: string, file: File) {
        const filePath = `profile-img/${userId}`;
        const storage = new Storage();
        const bucket = storage.bucket('profile');

        bucket.upload(filePath, (err, file) => {
            console.log(file)
            console.log(err);
        })
    }

    saveProfileWallpaper(userId: string, file: File) {
        const filePath = `wallpaper-img/${userId}`;
    }

    savePostMedia(userId: string, postId: string, file: File) {
        const filePath = `post-media/${userId}/${postId}`;
    }
}