import React, { useState } from 'react';
import Logo from "../assets/Logo.svg"
import { Menu, Camera } from 'lucide-react';

const Dashboard = ({ user = "Pierre", connections = [], onOpenMenu, onCamera, onSelectPerson }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideWidth = 200; // Ajuste la largeur des éléments du slider (50 dans ton exemple)

    const slides = [
        <div className="rounded-2xl bg-accent h-50 w-50" />,
        <div className="rounded-2xl bg-accent h-50 w-50" />,
        <div className="rounded-2xl bg-accent h-50 w-50" />,
        <div className="rounded-2xl bg-accent h-50 w-50" />,
    ];

    return (
        <div className="p-5">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
                <Menu onClick={onOpenMenu} />
                <img src={Logo} className='w-40' />
                <Camera onClick={onCamera} />
            </div>

            <h2 className='text-2xl mb-5'>Hi, <span className='font-bold'>{user}</span>!</h2>

            {/* Slider */}
            <div className="relative w-full">
                <h2 className='my-5 text-xl'>Your last connections :</h2>
                <div className="overflow-x-scroll scrollbar-none">
                    <div
                        className="flex gap-5"
                        style={{ scrollBehavior: 'smooth' }} // Ajout d'un défilement fluide
                    >
                        {slides.map((slide, index) => (
                            <div key={index} className="flex-shrink-0">
                                {slide}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative w-full">
                <h2 className='my-5 text-xl'>Your next meetings :</h2>
                <div className="rounded-2xl w-full h-50 bg-accent flex justify-center items-center">
                    <p className='italic opacity-30'>Coming soon...</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
