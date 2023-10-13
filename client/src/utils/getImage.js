const getImage = (filename) => {
    return new Promise((resolve) => {
        fetch(`/get-avatar/${filename}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }

            const imageSrc = `/get-avatar/${filename}`;
            resolve(imageSrc);
        })
        .catch(() => {
            resolve(false);
        });
    });
};

const uploadImage = (filename, image) => {
    const formData = new FormData();
    formData.append('avatar-upload', image);

    return new Promise((resolve) => {
        fetch(`upload-avatar/${filename}`, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }

            resolve(false);
        })
        .catch(() => {
            resolve(true);
        })
    });
};

const deleteImage = (filename) => {
    return new Promise((resolve) => {
        fetch(`/delete-avatar/${filename}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }
            resolve(true);
        })
        .catch(() => {
            resolve(false);
        });
    });
};

const readImage = (event, setUserAvatar) => {
    const file = event.target.files[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        setUserAvatar(event.target.result);
      };

      fileReader.readAsDataURL(file);
    }
};

export { getImage, uploadImage, deleteImage, readImage };