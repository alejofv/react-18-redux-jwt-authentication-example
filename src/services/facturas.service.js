import { fetchWrapper } from 'helpers/_fetch-wrapper';
import { store, selectJwt } from 'store';

export const facturasService = {
    getAll
};

const baseUrl = process.env.AUTH_API_URL;//'http://localhost:8080';

function getAll() {
    const jwt = selectJwt(store.getState());

    const url = `${baseUrl}/facturas`;
    const headers = { Authorization: `Bearer ${jwt}` }

    return fetchWrapper.get(url, null, headers)
}
