import multer from "multer";

let storage = multer.memoryStorage();

let fileFilter = function (req, file, cb) {
    let allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if(allowedTypes.includes(file.mimetype))
    {
        return cb(null, true);
    }
    cb(new Error("Only pdf, docx or txt files are allowed"));
}

let upload = multer({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024
    },
    fileFilter
})

export default upload;