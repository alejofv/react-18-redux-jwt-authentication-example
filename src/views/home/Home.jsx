import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { facturasActions, selectProfileFromJwt } from 'store';
import {HomeTable} from "./HomeTable";

export { Home };

function Home() {
    const dispatch = useDispatch();
    const profile = useSelector(selectProfileFromJwt);
    const { items } = useSelector(state => state.facturas);

    useEffect(() => {
        dispatch(facturasActions.getAll());
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1 className="display-4">Dashboard</h1>
            <p className="lead">Hi {profile.userName}!</p>

            <HomeTable items={items} />
        </div>
    );
}
