import React, { useState } from 'react';
import Logo from '../assets/Logo.svg'
import illustration from '../assets/Illustration.png'

const LoginScreen = ({ onLogin }) => {
    const [state, setState] = useState("login")
    return (
        <div>
            {state == "landing" && <div className="h-screen flex flex-col justify-between items-center p-10 text-center">
                <img src={Logo} className='w-40'/>

                <div>
                    <h2 className='text-[32px] inline'>Break isolation and <br/> <span className='font-black'>Create connections !</span></h2>
                    <img className='max-w-100 w-full' src={illustration}/>
                </div>

                <div className='flex flex-col w-full max-w-100 gap-4'>
                    <button onClick={()=>setState("login")} className='btn btn-primary h-15 max-w-100'>Log in</button>
                    <button onClick={()=>setState("signup")} className='btn btn-secondary h-15 max-w-100'>Sign up</button>
                </div>
            </div>}
            {state == "login" && <div className="h-screen flex flex-col justify-between items-center p-10 text-center">
                <img src={Logo} className='w-40'/>

                <div className='flex flex-col gap-10 w-full'>
                    <h2 className='text-[30px] font-bold inline'>Log In to <br />your account :</h2>
                    <form onSubmit={onLogin} action="#" id='login' className='w-full flex flex-col items-center'>
                        <label htmlFor="username">Username :</label>
                        <input className='max-w-100 input w-full my-4' type="text" required/>
                        <label htmlFor="password">Password :</label>
                        <input className='max-w-100 input w-full my-4' type="password" required/>
                    </form>
                </div>

                <div className='flex flex-col w-full max-w-100 gap-4'>
                    <button type="submit" form="login" className='btn btn-primary h-15 max-w-100'>Log in</button>
                    <button onClick={()=>setState("landing")} className='btn btn-secondary h-15 max-w-100'>Go back to landing page</button>
                </div>
            </div>}
            {state == "signup" && <div className="h-screen flex flex-col justify-between items-center p-10 text-center">
                <img src={Logo} className='w-40'/>

                <div className='flex flex-col gap-10 w-full'>
                    <h2 className='text-[30px] font-bold inline'>Create your <br />account :</h2>
                    <form onSubmit={()=>setState("login")} action="#" id='signup' className='text-left w-full flex flex-col items-center'>
                        <label htmlFor="username">Username :</label>
                        <input className='max-w-100 input w-full my-4' type="text" required/>
                        <label htmlFor="password">Password :</label>
                        <input className='max-w-100 input w-full my-4' type="password" required/>
                        <label htmlFor="email">Email :</label>
                        <input className='max-w-100 input w-full my-4' type="email" required/>
                    </form>
                </div>

                <div className='flex flex-col w-full max-w-100 gap-4'>
                    <button type="submit" form="signup" className='btn btn-primary h-15 max-w-100'>Sign up</button>
                    <button onClick={()=>setState("landing")} className='btn btn-secondary h-15 max-w-100'>Go back to landing page</button>
                </div>
            </div>}
        </div>
    );
};

export default LoginScreen;
