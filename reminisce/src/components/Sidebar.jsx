import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from "lucide-react";
import Logo from "../assets/Logo.svg"

const Sidebar = ({ onClose }) => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
        onClose();
    };

    return (
        <div className="fixed h-screen inset-0 z-50 bg-black/50" onClick={onClose}>
            <div className="flex flex-col w-[85%] py-10 justify-between h-full p-8 bg-white animate-[slideRight_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-8">
                    <X onClick={onClose} className="cursor-pointer" />
                    <img src={Logo} className='w-40' alt="Logo" />
                </div>

                <div className='flex flex-col gap-5'>
                    <button onClick={() => handleNavigate('/dashboard')} className='btn bg-gray-100 text-black border-none hover:bg-gray-200 w-full h-12 rounded-xl font-medium'>Home</button>
                    <button onClick={() => handleNavigate('/connections')} className='btn bg-gray-100 text-black border-none hover:bg-gray-200 w-full h-12 rounded-xl font-medium'>My connections</button>
                    <button className='btn bg-gray-100 text-black border-none w-full h-12 rounded-xl font-medium opacity-50 cursor-not-allowed'>Meeting <span className='opacity-50 text-xs ml-1'>coming soon...</span></button>
                    <button onClick={() => handleNavigate('/admin')} className='btn bg-gray-100 text-black border-none hover:bg-gray-200 w-full h-12 rounded-xl font-medium'>Settings</button>
                </div>

                <button onClick={() => handleNavigate('/')} className='btn bg-[#FF5C5C] text-white hover:bg-red-600 border-none w-full h-12 rounded-xl font-bold'>Disconnect</button>
            </div>
        </div>
    );
};

export default Sidebar;