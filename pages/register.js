import React from 'react'
import AuthLayout from "../components/layout/auth/AuthLayout"
import RegisterForm from '../components/form/register/RegisterForm';

export default()=> {
    return (
        <AuthLayout>
            <RegisterForm/>
        </AuthLayout>
    )
}
