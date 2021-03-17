import ButtonIcon from 'core/components/ButtonIcon';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

type FormData = {
    userName: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = (data:FormData) => {
        console.log(data);
    }

    return (
        <div>
            <AuthCard text="login">
                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        type="email" 
                        className="form-control input-base margin-bottom-30" 
                        placeholder="Email"
                        name="username"
                        ref={register}
                    />
                    <input 
                        type="password" 
                        className="form-control input-base" 
                        placeholder="Senha"
                        name="password"
                        ref={register}
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