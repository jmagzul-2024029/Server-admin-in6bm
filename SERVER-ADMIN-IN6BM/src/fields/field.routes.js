import { Router } from "express";
import { createField, getFields } from "./field.controller.js";
import { uploadFieldImage } from "../../middlewares/file-uploader.js";
import { cleanUploaderFileOnFinish } from "../../middlewares/delete-file-on-error.js";

const router = Router();

router.post(
    '/create',
    uploadFieldImage.single('image'),
    cleanUploaderFileOnFinish,
    createField
)

router.get(
    '/',
    getFields
)

export default router;
