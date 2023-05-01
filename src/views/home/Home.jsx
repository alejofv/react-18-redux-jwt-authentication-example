import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { facturasActions, selectProfileFromJwt } from 'store';

export { Home };

function Home() {
    const dispatch = useDispatch();
    const profile = useSelector(selectProfileFromJwt);
    const { items: facturas } = useSelector(state => state.facturas);

    useEffect(() => {
        dispatch(facturasActions.getAll());
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Hi {profile.userName}!</h1>
            <p>You're logged in!</p>

            <h3>Listado de facturas:</h3>
            {facturas.length &&
                <ul>
                    {facturas.map(f =>
                        <li key={f.id}>{f.text}</li>
                    )}
                </ul>
            }
            {facturas.loading && <div className="spinner-border spinner-border-sm"></div>}
            {facturas.error && <div className="text-danger">Error cargando facturas: {facturas.error.message}</div>}
        </div>
    );
}
