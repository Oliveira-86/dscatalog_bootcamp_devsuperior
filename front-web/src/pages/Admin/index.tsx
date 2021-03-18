import Navbar from './components/Navbar/index'
import './styles.scss';
import { Route, Switch } from 'react-router-dom';
import Products from './components/Products';
import PrivateRoute from 'pages/Admin/components/Routes';

const Admin = () =>  (
    <div className="admin-container">
        <Navbar />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/products">
                    <Products />
                </PrivateRoute>
                <PrivateRoute path="/admin/categories">
                    <h1>Categories</h1>
                </PrivateRoute>
                <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']} >
                    <h1>users</h1>
              </PrivateRoute>
            </Switch>
        </div>
    </div> 
);

export default Admin;