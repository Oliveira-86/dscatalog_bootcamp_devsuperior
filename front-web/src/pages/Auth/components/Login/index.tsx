import ButtonIcon from 'core/components/ButtonIcon';
import { makeLogin } from 'core/utils/request';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const [hasError, setHasError] = useState(false);

    const onSubmit = (data: FormData) => {
        makeLogin(data)
            .then(response => {
                setHasError(false);
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
                    <input
                        type="email"
                        className="form-control input-base margin-bottom-30"
                        placeholder="Email"
                        name="username"
                        ref={register({ required: true })}
                    />
                    <input
                        type="password"
                        className="form-control input-base"
                        placeholder="Senha"
                        name="password"
                        ref={register({ required: true })}
                    />
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