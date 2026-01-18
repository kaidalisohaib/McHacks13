import React from 'react';

const Connections = ({ connections, onOpenMenu, onSelectPerson, onCamera }) => {
    return (
        <div className="h-full p-6 overflow-y-auto bg-gray-50">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button className="text-2xl" onClick={onOpenMenu}>☰</button>
                <div className="flex items-center gap-2 text-xl font-black tracking-widest text-gray-900">
                    <span className="text-primary-red">●</span> REMIN<strong>AIS</strong>
                </div>
                <button className="text-2xl" onClick={onCamera}>📷</button>
            </div>

            <h2 className="mb-6 text-2xl font-bold">My connection</h2>

            <div className="space-y-4">
                {connections.length > 0 ? connections.map((c, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
                        {c.photo && (
                            <div className="mt-2 mb-4">
                                <img 
                                    src={c.photo} 
                                    alt="Conversation moment"
                                    className="w-full max-w-md rounded-lg shadow-md object-cover"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <h3 className="mb-1 text-lg font-bold">{c.name}</h3>
                            <div className="mb-3 text-sm text-gray-500">{c.bio || 'Friend'}</div>
                            <button className="px-5 py-2 text-xs font-semibold text-white rounded-lg bg-primary-red" onClick={() => onSelectPerson(c)}>
                                About him
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="p-8 text-center text-gray-400">
                        No connections found. Switch to Admin mode to add some!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Connections;
