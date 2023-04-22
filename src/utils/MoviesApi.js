export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const handleOriginalResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(res);
    }
    return res.json();
}

export const getMovies = () => {
    return fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(handleOriginalResponse);
}
