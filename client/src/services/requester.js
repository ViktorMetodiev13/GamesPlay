export const request = async (method, token, url, data) => {
    const options = {};

    if (method !== 'GET') {
        options.method = method;
        options.headers = {
            'content-type': 'application/json',
        };
        options.body = JSON.stringify(data);
    }

    if (token) {
        options.headers = {
            ...options.headers,
            'X-Authorization': token,
        };
    }

    const response = await fetch(url, options);

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
};

export const requestFactory = (token) => {
    if (!token) {
        const serializedAuth = localStorage.getItem('auth');

        if (serializedAuth) {
            const auth = JSON.parse(serializedAuth);
            token = auth.accessToken;
        };
    };

    return {
        get: request.bind(null, 'GET', token),
        post: request.bind(null, 'POST', token),
        put: request.bind(null, 'PUT', token),
        patc: request.bind(null, 'PATCH', token),
        delete: request.bind(null, 'DELETE', token),
    };
};