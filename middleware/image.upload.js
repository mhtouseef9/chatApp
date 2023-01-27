const multer = require('multer');
// const AWS = require('aws-sdk');
// const multerS3 = require('multer-s3');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // this ./uploads directory can be passed in request from any middleware according route.
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        // upload only png, jpeg and jpg format
        return cb(new Error("Only images allowed"));
    }
    cb(undefined, true);
}

// for s3
// const s3Config = new AWS.S3({
//     accessKeyId: process.env.AWS_IAM_USER_KEY,
//     secretAccessKey: process.env.AWS_IAM_USER_SECRET,
//     Bucket: process.env.AWS_BUCKET_NAME
// });

// for s3
// const multerS3Config = multerS3({
//     s3: s3Config,
//     bucket: process.env.AWS_BUCKET_NAME || "test",
//     metadata: function (req, file, cb) {
//         cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//         console.log(file)
//         cb(null, new Date().toISOString() + '-' + file.originalname)
//     }
// });

const imageUpload = multer({
    storage: storage, // for local uploading
    // storage: multerS3Config, // for s3 uploading
    limits: {
        fileSize: 1024 * 1024 * 10 , // in Bytes,  10 MB
    },
    fileFilter: fileFilter
});
//
// imageUpload(req, res, (err) => {
//     if (err) {
//         if (err.message) {
//             return {
//                 success: 0,
//                 msg: err.message
//             };
//         }
//         return {
//             success: 0,
//             msg: "Image not uploaded!"
//         };
//     }
//     return {
//         success: 1,
//         msg: req.file
//     };
// });

module.exports = imageUpload;
