const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const fileFilter = (req, file , cb) => {
    //  jpg , png  , jpeg
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Only .png, .jpg and .jpeg formats are allowed!'), false);
    }
}

const upload = multer({ 
    storage: storage , 
    limits : {
        fieldSize : 10 * 1024 * 1024 // 10 MB
    },
    fileFilter: fileFilter
})



module.exports = upload

