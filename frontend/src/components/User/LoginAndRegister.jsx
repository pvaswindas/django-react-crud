import React from 'react';
import AuthForm from './Form/AuthForm';

function LoginPage() {
    return <AuthForm mode="login" />;
}

function RegisterPage() {
    return <AuthForm mode="register" />;
}

export { LoginPage, RegisterPage };
