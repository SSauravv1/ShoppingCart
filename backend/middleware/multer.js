import multer from "multer";

const storage = multer.diskStorage({
    filename:function(req,file,callback){
    callback(null,file.originalname)
    }
})

const upload = multer({storage})

export default upload

// import multer from "multer";
// import path from "path";

// // Storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // make sure uploads/ folder exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // unique file name
//   },
// });

// // Multer middleware
// const upload = multer({ storage });

// export default upload;
