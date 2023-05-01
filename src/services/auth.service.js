import { fetchWrapper } from 'helpers/_fetch-wrapper';

export const authService = {
    authenticate
};

const baseAuthUrl = process.env.AUTH_API_URL;//'http://localhost:8080';

function authenticate(username, password, tenant) {
    const url = `${baseAuthUrl}/v1/auth/login`;

    const headers = {
        'Content-Type': 'application/json',
        'x-tenantid': tenant || 'Schryver'
    };

    const body = {
        username,
        password
    };

    return fetchWrapper.post(url, body, headers);
}
