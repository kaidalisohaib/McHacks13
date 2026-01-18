import React, { useState } from 'react';
import Logo from "../assets/Logo.svg"
import { Menu, Camera } from 'lucide-react';

const Connections = ({ connections, onOpenMenu, onSelectPerson, onCamera }) => {
    const slides = [
        <div className="rounded-2xl bg-accent h-50 w-50" />,
        <div className="rounded-2xl bg-accent h-50 w-50" />,
        <div className="rounded-2xl bg-accent h-50 w-50" />,
        <div className="rounded-2xl bg-accent h-50 w-50" />,
        <div className="rounded-2xl bg-accent h-50 w-50" />,
        <div className="rounded-2xl bg-accent h-50 w-50" />,
        <div className="rounded-2xl bg-accent h-50 w-50" />,
        <div className="rounded-2xl bg-accent h-50 w-50" />,
        <div className="rounded-2xl bg-accent h-50 w-50" />,
        <div className="rounded-2xl bg-accent h-50 w-50" />,
        <div className="rounded-2xl bg-accent h-50 w-50" />,
        <div className="rounded-2xl bg-accent h-50 w-50" />,
    ];
    return (
        <div className="p-5 flex flex-col h-screen">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
                <Menu onClick={onOpenMenu} />
                <img src={Logo} className='w-40' />
                <Camera onClick={onCamera} />
            </div>

            <div className="relative flex-1 h-full">
                <h2 className='my-5 text-xl'>Your connections :</h2>
                    <div className="flex flex-col gap-5 h-full overflow-y-scroll scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
                        {slides.map((slide, index) => (
                            <div key={index} className="flex-shrink-0">
                                {slide}
                            </div>
                        ))}
                </div>
            </div>

        </div>
    );
};

export default Connections;
