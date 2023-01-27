const multer = require("multer");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const imageUpload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000, // 1000000 Bytes = 10 MB
    }
}).single("image");

imageUpload(req, res, (err) => {
    if (err) {
        if (err.message) {
            return res.status(500).json({
                success: 0,
                msg: err.message,
            });
        }
        return res.status(500).json({
            success: 0,
            msg: "Only images allowed",
        });
    }
    res.status(200).json({
        success: 1,
        msg: req.file,
    });
});