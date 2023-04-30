import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import jwtDecode from "jwt-decode";

import { userActions } from '_store';

export { Home };

function Home() {
    const dispatch = useDispatch();
    const { token: authToken } = useSelector(x => x.auth);
    const { users } = useSelector(x => x.users);

    const claims = jwtDecode(authToken.access_token);
    const profile = {
        userId: claims.cd_identityUsuario,
        userName: claims.nb_nombreUsuario,
    };

    useEffect(() => {
        dispatch(userActions.getAll());
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Hi {profile.userName}!</h1>
            <p>You're logged in with React 18 + Redux & JWT!!</p>
            <h3>Users from secure api end point:</h3>
            {users.length &&
                <ul>
                    {users.map(user =>
                        <li key={user.id}>{user.firstName} {user.lastName}</li>
                    )}
                </ul>
            }
            {users.loading && <div className="spinner-border spinner-border-sm"></div>}
            {users.error && <div className="text-danger">Error loading users: {users.error.message}</div>}
        </div>
    );
}
