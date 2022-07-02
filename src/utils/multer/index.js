const { config } = require('../../config');

const fs = require('fs');
const multer = require('multer');
const path = require('path')

class uploadFile {
  constructor({ fileNameProp, destination }) {
    this.fileNameProp = fileNameProp;
    this.destination = destination || `${config.UPLOAD_FOLDER}/uploads`;
    
    this.diskStorage = this.getDiskStorage();
    return multer({ storage: this.diskStorage, fileFilter: uploadFile.fileFilter })
  }

  getDiskStorage() {
    const diskStorage = multer.diskStorage({
      destination: (req, file, cb) => {
          if (!fs.existsSync(this.destination)) {
            fs.mkdirSync(this.destination);
          }
          cb(null, this.destination);
      },
      filename: (req, file, cb) => {
          const extension = path.extname(file.originalname);
          cb(null, `${req["body"][this.fileNameProp]}${extension}`);
      }
    });

    return diskStorage
  }

  static fileFilter = (req, file, next) => {
    const imageFormats = ['image/gif', 'image/png', 'image/jpeg'];
    const isPhotoFile = element => file.mimetype === element;
    
    const isPhoto =  imageFormats.some(isPhotoFile);

    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "The file type is not valid" }, false);
    }
  }
}

module.exports = { uploadFile }