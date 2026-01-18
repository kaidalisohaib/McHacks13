import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.svg'
import illustration from '../assets/Illustration.png'

const LoginScreen = () => {
    const navigate = useNavigate();
    const [state, setState] = useState("landing"); // landing, login, signup

    const handleLogin = (e) => {
        e.preventDefault();
        // In a real app, validate credentials here
        navigate('/dashboard');
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // In a real app, create account here
        setState('login');
    };

    return (
        <div>
            {state === "landing" && (
                <div className="h-screen flex flex-col justify-between items-center p-10 text-center bg-gray-50">
                    <img src={Logo} className='w-40' alt="Logo" />

                    <div>
                        <h2 className='text-[32px] inline'>Break isolation and <br /> <span className='font-black'>Create connections !</span></h2>
                        <img className='max-w-100 w-full mt-10' src={illustration} alt="Illustration" />
                    </div>

                    <div className='flex flex-col w-full max-w-100 gap-4'>
                        <button onClick={() => setState("login")} className='btn bg-primary-red text-white hover:bg-red-600 border-none h-15 max-w-100 rounded-xl font-bold text-lg'>Log in</button>
                        <button onClick={() => setState("signup")} className='btn bg-white text-black border border-black hover:bg-gray-100 h-15 max-w-100 rounded-xl font-bold text-lg'>Sign up</button>
                    </div>
                </div>
            )}

            {state === "login" && (
                <div className="h-screen flex flex-col justify-between items-center p-10 text-center bg-gray-50">
                    <img src={Logo} className='w-40' alt="Logo" />

                    <div className='flex flex-col gap-10 w-full'>
                        <h2 className='text-[30px] font-bold inline'>Log In to <br />your account :</h2>
                        <form onSubmit={handleLogin} id='login' className='w-full flex flex-col items-center'>
                            <div className="w-full text-left max-w-md">
                                <label htmlFor="username" className="font-bold ml-1">Username :</label>
                                <input className='input w-full my-2 bg-gray-200 border-none rounded-xl p-4' type="text" required placeholder="Enter your username" />
                            </div>
                            <div className="w-full text-left max-w-md mt-4">
                                <label htmlFor="password" className="font-bold ml-1">Password :</label>
                                <input className='input w-full my-2 bg-gray-200 border-none rounded-xl p-4' type="password" required placeholder="Enter your password" />
                            </div>
                        </form>
                    </div>

                    <div className='flex flex-col w-full max-w-100 gap-4'>
                        <button type="submit" form="login" className='btn bg-primary-red text-white hover:bg-red-600 border-none h-15 max-w-100 rounded-xl font-bold text-lg'>Log in</button>
                        <button type="button" onClick={() => setState("landing")} className='btn bg-transparent text-gray-500 border-none hover:bg-gray-100 h-15 max-w-100 rounded-xl font-medium'>Go back</button>
                    </div>
                </div>
            )}

            {state === "signup" && (
                <div className="h-screen flex flex-col justify-between items-center p-10 text-center bg-gray-50">
                    <img src={Logo} className='w-40' alt="Logo" />

                    <div className='flex flex-col gap-5 w-full'>
                        <h2 className='text-[30px] font-bold inline'>Create your <br />account :</h2>
                        <form onSubmit={handleSignup} id='signup' className='text-left w-full flex flex-col items-center'>
                            <div className="w-full text-left max-w-md">
                                <label htmlFor="username" className="font-bold ml-1">Username :</label>
                                <input className='input w-full my-2 bg-gray-200 border-none rounded-xl p-4' type="text" required />
                            </div>
                            <div className="w-full text-left max-w-md mt-2">
                                <label htmlFor="password" className="font-bold ml-1">Password :</label>
                                <input className='input w-full my-2 bg-gray-200 border-none rounded-xl p-4' type="password" required />
                            </div>
                            <div className="w-full text-left max-w-md mt-2">
                                <label htmlFor="email" className="font-bold ml-1">Email :</label>
                                <input className='input w-full my-2 bg-gray-200 border-none rounded-xl p-4' type="email" required />
                            </div>
                        </form>
                    </div>

                    <div className='flex flex-col w-full max-w-100 gap-4 mt-4'>
                        <button type="submit" form="signup" className='btn bg-primary-red text-white hover:bg-red-600 border-none h-15 max-w-100 rounded-xl font-bold text-lg'>Sign up</button>
                        <button type="button" onClick={() => setState("landing")} className='btn bg-transparent text-gray-500 border-none hover:bg-gray-100 h-15 max-w-100 rounded-xl font-medium'>Go back</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginScreen;
