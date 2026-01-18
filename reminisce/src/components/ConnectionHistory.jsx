import React from 'react';

const ConnectionHistory = ({ person, onOpenMenu, onBack, onCamera }) => {
    if (!person) return <div>No person selected</div>;

    // Sort history by date descending
    const history = [...(person.history || [])].reverse();

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

            <div className="flex items-center gap-4 mb-8">
                <button onClick={onBack} className="text-xl">←</button>
                <h2 className="text-2xl font-bold">Conversation history</h2>
            </div>

            {/* Profile Photo */}
            {person.photo && (
                <div className="mb-8">
                    <img 
                        src={person.photo} 
                        alt={`${person.name}'s profile`}
                        className="w-32 h-32 rounded-full object-cover shadow-lg mx-auto"
                    />
                    <h3 className="text-center mt-4 text-xl font-bold">{person.name}</h3>
                    <p className="text-center text-gray-500 text-sm">{person.bio}</p>
                </div>
            )}

            <div className="relative pl-8 ml-3 border-l-2 border-black">
                {history.length > 0 ? history.map((h, i) => (
                    <div key={i} className="mb-8 relative">
                        {/* Dot */}
                        <div className="absolute top-1 -left-[43px] w-3 h-3 bg-black rounded-full ring-4 ring-gray-50"></div>

                        <div className="inline-block px-3 py-1 mb-2 text-xs font-medium text-gray-500 rounded bg-gray-200">
                            {new Date(h.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        
                        <div className="mt-1 flex gap-4 items-start">
                            <div className="flex-1">
                                <h3 className="mb-2 text-lg font-bold">Connection with {person.name}</h3>
                                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                                    {h.summary}
                                </p>
                                <button className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-primary-red">
                                    More details
                                </button>
                            </div>
                            
                            {/* Photo Display */}
                            {h.photo && (
                                <div className="flex-shrink-0">
                                    <img 
                                        src={h.photo} 
                                        alt="Conversation moment"
                                        className="w-24 h-24 rounded-lg shadow-md object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="py-8 text-center text-gray-400">No conversation history yet.</div>
                )}
            </div>
        </div>
    );
};

export default ConnectionHistory;
