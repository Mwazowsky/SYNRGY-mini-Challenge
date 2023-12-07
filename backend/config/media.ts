import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

class Media {
  private _upload;
  private _storage;

  constructor() {
    this._upload = multer({ storage: multer.memoryStorage() });
    cloudinary.config({
      cloud_name: 'ddpriosuk',
      api_key: '845128578186369',
      api_secret: 'FEaNCR0ZORheUUSu3_ShOSDnldI',
    });

    this._storage = cloudinary;
  }

  get upload() {
    return this._upload;
  }

  get storage() {
    return this._storage;
  }
}

export default new Media();
