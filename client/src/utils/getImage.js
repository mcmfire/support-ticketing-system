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

export default getImage;