export const BASE_URL = 'http://127.0.0.1:3000';

const handleOriginalResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(res);
    }
    return res.json();
}

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, password, email })
    })
        .then(handleOriginalResponse);
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(handleOriginalResponse);
};

export const editCredentials = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({ name, email })
    })
        .then(handleOriginalResponse);
};

export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(handleOriginalResponse);
}

export const postAMovie = (country, director, duration, year,
    description, image, trailer, nameRU, nameEN, thumbnail, movieId) => {
        console.log(country, director, duration, year,
            description, image, trailer, nameRU, nameEN, thumbnail, movieId)
    const token = localStorage.getItem('jwt');
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailer,
            nameRU,
            nameEN,
            thumbnail,
            movieId
        })
    })
        .then(handleOriginalResponse);
}

export const removeMovie = (movieId) => {
    const token = localStorage.getItem('jwt');
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(handleOriginalResponse);
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(handleOriginalResponse);
}
