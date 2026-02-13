import { cloudinary } from "./file-uploader.js";

export const cleanUploaderFileOnFinish = (req, res, next) => {
    if (req.file) { //si en la request hay un archivo
        res.on('finish', async () =>{
            try {
                if (res.statusCode >= 400) {
                    const publicId = req.file.public_id || req.file.filename;
                    if (publicId) {
                        await cloudinary.uploader.destroy(publicId);
                        console.log(
                            `Archivo Cloudinary eliminado por respuesta ${res.statusCode}: ${publicId}`
                        )
                    }
                }
            } catch (error) {
                console.error(`ERROR REAL:, ${error}`);

                console.error(`Error al eliminar archivo de cloudinary tras error de respuesta ${error.message}`)
            }
        })
    }

    next();
}

export const deleteFileOnError = async (err, req, res, next) => {
    try {
        if (req.file) {
            const publicId = req.file.public_id || req.file.filename;
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
                console.log(
                    `Archivo cloudinary eliminado por error en cadena: ${publicId}`
                )
            }
        }
    } catch (error) {
        console.error(`Error al eliminar archivo de Cloudinary (error handler): ${error.message}`)
    }
    return next(err);
}