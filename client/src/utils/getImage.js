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

export { getImage, deleteImage };