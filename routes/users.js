let express = require('express');
let router = express.Router();
let cloudinary = require('cloudinary').v2;
let multer = require('multer');
let {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "DEV",
    },
});
const upload = multer({ storage: storage });

router.post("/sendImage", upload.single("image"), async (req, res) => {
    return res.json({ image: req.file.path });
});

module.exports = router;
