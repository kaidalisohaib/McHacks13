import React, { useState } from 'react';

const Dashboard = ({ user = "Pierre", connections = [], onOpenMenu, onCamera, onSelectPerson }) => {
    return (
        <div className="h-full p-6 overflow-y-auto bg-gray-50">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
                <button className="text-2xl" onClick={onOpenMenu}>
                    ☰
                </button>
                <div className="flex items-center gap-2 text-xl font-black tracking-widest text-gray-900">
                    <span className="text-primary-red">●</span> REMIN<strong>AIS</strong>
                </div>
                <button className="text-2xl" onClick={onCamera}>
                    📷
                </button>
            </div>

            {/* Greeting */}
            <h1 className="mb-6 text-3xl font-light">Hi, <strong>{user}</strong> !</h1>

            {/* Connections */}
            <div className="mb-4 text-base font-medium">Your last connections :</div>
            <div className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide">
                {connections.length > 0 ? connections.map((c, i) => (
                    <div key={i} className="min-w-[140px] bg-white rounded-2xl border border-gray-100 p-3 flex flex-col items-center text-center shadow-sm">
                        {c.photo && (
                            <div className="mt-2 mb-4">
                                <img 
                                    src={c.photo} 
                                    alt="Conversation moment"
                                    className="w-full max-w-md rounded-lg shadow-md object-cover"
                                />
                            </div>
                        )}
                        <strong className="block text-sm font-bold text-gray-900">{c.name}</strong>
                        <span className="text-xs text-gray-500">{c.bio || 'Friend'}</span>
                        <button
                            className="w-full py-1.5 mt-2 text-xs font-semibold text-white rounded-lg bg-primary-red"
                            onClick={() => onSelectPerson(c)}
                        >
                            About him
                        </button>
                    </div>
                )) : (
                    <div className="text-gray-400">No connections yet.</div>
                )}
            </div>

            {/* Meetings Placeholder */}
            <div className="mt-6 mb-4 text-base font-medium">Your next meetings :</div>
            <div className="flex items-center justify-center w-full h-40 text-lg font-semibold text-white bg-red-200 rounded-2xl">
                Coming soon...
            </div>
        </div>
    );
};

export default Dashboard;
