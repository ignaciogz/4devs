const { config } = require('../../config');

const fs = require('fs');
const jimp = require('jimp');
const path = require('path')

const resizer = ({ width, height, fileNameProp, folder }) => {
    return async (req, res, next) => {
        if (!req.file) {
          return next();
        }

        const extension = path.extname(req.file.filename);
        const destination = `${config.UPLOAD_FOLDER}/${folder}`;

        const photo = await jimp.read(req.file.path);
        await photo.resize(width, height);
        await fs.unlink(req.file.path, (err => {if (err) console.log(err)}));

        if (!fs.existsSync(destination)) {
          fs.mkdirSync(destination);
        }
        await photo.write(`${destination}/${req["body"][fileNameProp]}${extension}`);
      
        next();
    };
}

module.exports = { resizer }