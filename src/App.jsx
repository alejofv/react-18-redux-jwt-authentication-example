import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from 'helpers';
import { Nav, PrivateRoute } from 'components';
import { Home } from 'views/home';
import { Login } from 'views/login';

export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="app-container bg-light">
            <Nav />
            <div className="container pt-4 pb-4">
                <Routes>
                  <Route path="/"
                    element={<PrivateRoute><Home /></PrivateRoute>} />

                  <Route path="/login"
                    element={<Login />} />

                  <Route path="*"
                    element={<Navigate to="/" />} />

                </Routes>
            </div>
        </div>
    );
}
