exports.uploadImages = (req, res) => {
    if (req.files) {
        let images = uploadImage(req.files)
        res.status(200).send(addImageHost(req, images));
    }

    else {
        res.status(200).send([]);
    }
}

function uploadImage(images){
    return images.map((image) => {
        return {original: image.path};
    })
}

const addImageHost = (req, images) => {
    return images.map((path) => {
        path.original = basePath(req.hostname) + path.original;
        return path;
    });
}

const basePath = (host) => {
    return "http://" + host + ":" + process.env.PORT + "/";
}

