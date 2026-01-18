
import React from 'react';
import {X} from "lucide-react";
import Logo from "../assets/Logo.svg"

const Sidebar = ({ onClose, onNavigate }) => {
    return (
        <div className="fixed h-screen inset-0 z-50 bg-black/50" onClick={onClose}>
            <div className="flex flex-col w-[85%] py-10 justify-between h-full p-8 bg-white animate-[slideRight_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-8">
                    <X onClick={onClose}/>
                    <img src={Logo} className='w-40'/> 
                </div>

                <div className='flex flex-col gap-5'>
                    <button onClick={()=>onNavigate('DASHBOARD')} className='btn btn-secondary w-full h-12'>Home</button>
                    <button onClick={()=>onNavigate('CONNECTIONS')} className='btn btn-secondary w-full h-12'>My connections</button>
                    <button onClick={()=>onNavigate('HISTORY')} className='btn btn-secondary w-full h-12'>Conversation history</button>
                    <button className='btn btn-secondary w-full h-12 disabled'>Meeting <span className='opacity-30 text-xs'>coming soon...</span></button>
                    <button onClick={()=>onNavigate('ADMIN')} className='btn btn-secondary w-full h-12'>Settings</button>
                </div>
   
                <button onClick={()=>onNavigate('LOGIN')} className='btn btn-primary'>Disconnect</button>
            </div>
        </div>
    );
};

export default Sidebar;