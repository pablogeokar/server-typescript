
import multer from 'multer'

export default {

  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5mb
    fieldNameSize: 200
  },
  fileFilter: (req: Express.Request, file: Express.Multer.File, cb: Function) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
}
