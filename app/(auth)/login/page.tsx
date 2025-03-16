import { LoginForm } from '@/components/login-form'
import { ToastContainer } from 'react-toastify';
import React from 'react'

function Login() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 font-[var(--font-poppins)]">
            <div className="w-full max-w-sm">
                <LoginForm />
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login
