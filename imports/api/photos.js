import { Mongo } from 'meteor/mongo';
import { FilesCollection } from '.meteor/ostrio:files';
import path from 'path';

export const Photos = new FilesCollection({
  collectionName: 'Photos',
  storagePath: path.resolve('../../public/photos'),
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 5MB, and only in png/jpg/jpeg formats
    if (file.size <= 5242880 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 5MB';
    }
  }
});
