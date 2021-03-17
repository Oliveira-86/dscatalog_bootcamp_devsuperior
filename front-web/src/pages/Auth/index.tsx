import './styles.scss';
import { ReactComponent as ImgAuth } from '../../core/assets/images/Desenho.svg'
import { Route, Switch } from 'react-router';
import Login from './components/Login';

const Auth = () => (
    <div className="auth-container">
        <div className="auth-info-content">
            <h1 className="auth-info-title">
                Divulgue seus produtos <br /> no DS Catalog
          </h1>
            <p className="auth-info-subtitle">
                Faça parte do nosso catálogo de divulgação <br /> e aumente a venda dos seus produtos.
          </p>
            <div>
                <ImgAuth />
            </div>
        </div>
        <div>
            <Switch>
                <Route path="/admin/auth/login">
                   <Login />
                </Route>
                <Route path="/admin/auth/register">
                    <h1>register</h1>
                </Route>
                <Route path="/admin/auth/recover">
                    <h1>recover</h1>
                </Route>
            </Switch>
        </div>
    </div>
);

export default Auth;