import ButtonIcon from 'core/components/ButtonIcon';
import { saveSessionData } from 'core/utils/auth';
import { makeLogin } from 'core/utils/request';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

type FormData = {
    username: string;
    password: string;
}

type LocationState = {
    from: string;
}

const Login = () => {
    const { register, handleSubmit, errors } = useForm<FormData>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();
    let location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: "/admin" } };

    const onSubmit = (data: FormData) => {
        makeLogin(data)
            .then(response => {
                setHasError(false);
                saveSessionData(response.data);
                history.replace(from);
            })
            .catch(() => {
                setHasError(true);
            })
    }

    return (
        <div>
            <AuthCard text="login">
                {hasError && (
                    <div className="alert alert-danger mt-5">
                        Senha ou usuário inválido!
                    </div>
                )}
                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="margin-bottom-30">
                        <input
                            type="email"
                            className={`form-control input-base ${errors.username ? 'is-invalid' : ''}`}
                            placeholder="Email"
                            name="username"
                            ref={register({
                                required: "Campo obrigatório",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Email inválido"
                                }
                              })}
                        />
                        {errors.username && (
                            <div className="invalid-feedback d-block">
                                {errors.username.message}
                            </div>
                        )}
                    </div>
                    <input
                        type="password"
                        className={`form-control input-base ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Senha"
                        name="password"
                        ref={register({ required: "Campo obrigatório" })}
                    />
                    {errors.password && (
                        <div className="invalid-feedback d-block">
                            {errors.password.message}
                        </div> 
                    )}
                    <Link to="/admin/auth/recover" className="login-link-recover">
                        Esqueci a senha?
                    </Link>
                    <div className="login-submit">
                        <ButtonIcon text="logar" />
                    </div>
                    <div className="text-center">
                        <span className="not-register">
                            Não tem cadastro?
                        </span>
                        <Link to="admin/auth/register" className="login-link-register">
                            CADASTRAR
                        </Link>
                    </div>
                </form>
            </AuthCard>
        </div>
    );
}

export default Login;