import React from 'react';
import './styles.scss';

type Props = {
    text: string;
    children: React.ReactNode;
}

const AuthCard = ({ text, children }:Props) => {
    return (
        <div className="card-base auth-card">
            <h1 className="auth-card-title">
                {text}
            </h1>
            {children}
        </div>
    );
}

export default AuthCard;