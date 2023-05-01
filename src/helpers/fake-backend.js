export { fakeBackend };

function fakeBackend() {
    const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZF9pZGVudGl0eVVzdWFyaW8iOiIxMjMiLCJuYl9ub21icmVVc3VhcmlvIjoiVGVzdCB1c2VyIiwiZXhwIjoxNjgyOTYyNDgyLCJpc3MiOiJodHRwczovL2xvZ2ljYXBwLmlvIiwiYXVkIjoiaHR0cHM6Ly9sb2dpY2FwcC5pbyJ9.gD9PmMKno0NXsdnDhZ8VSGv5rUqt1EtWpECONjbxoxE';
    const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
    const facturas = [{id: 1, text: 'factura 1'},{id: 2, text: 'factura 2'},{id: 3, text: 'factura 3'}]

    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/auth/login') && opts.method === 'POST':
                        return authenticate();
                    case url.endsWith('/facturas') && opts.method === 'GET':
                        return getFacturas();

                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { username, password } = body();
                const user = users.find(x => x.username === username && x.password === password);

                if (!user) return error('Username or password is incorrect');

                return ok({
                    // sample JWT from https://jwt.io
                    access_token: defaultToken
                });
            }

            function getFacturas() {
                if (!hasToken()) return unauthorized();
                return ok(facturas);
            }

            // helper functions

            function body() {
                return opts.body && JSON.parse(opts.body);
            }

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) })
            }

            function hasToken() {
                return (opts.headers['Authorization'] || '') === `Bearer ${defaultToken}`;
            }
        });
    }
}
