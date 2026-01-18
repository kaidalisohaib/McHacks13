import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from "../assets/Logo.svg"
import { Menu, Camera, ArrowLeft } from 'lucide-react';
import Sidebar from './Sidebar';
import { useFace } from '../context/FaceContext';

const ConnectionHistory = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const { knownFaces, updateContact } = useFace();
    const [showMenu, setShowMenu] = useState(false);
    const [expandedItems, setExpandedItems] = useState({});

    // Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [editContact, setEditContact] = useState("");

    const person = knownFaces.find(p => p.name === name);

    // Initialize edit contact when person loads
    useEffect(() => {
        if (person) setEditContact(person.contact || "");
    }, [person]);

    const toggleExpand = (index) => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleSaveContact = () => {
        updateContact(person.name, editContact);
        setIsEditing(false);
    };

    if (!person) return <div className="p-8 text-center">Person not found.</div>;

    // Sort history by date descending
    const history = [...(person.history || [])].reverse();

    return (
        <div className="h-full p-6 overflow-y-auto bg-gray-50">
            {showMenu && <Sidebar onClose={() => setShowMenu(false)} />}

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Menu onClick={() => setShowMenu(true)} className="cursor-pointer text-gray-700 hover:text-gray-900" />
                <img src={Logo} className='w-32' alt="Logo" />
                <Camera onClick={() => navigate('/camera')} className="cursor-pointer text-gray-700 hover:text-gray-900" />
            </div>

            <div className="flex items-center gap-4 mb-8">
                <div onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm cursor-pointer hover:bg-gray-100">
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Conversation History</h2>
            </div>

            {/* Profile Card */}
            <div className="mb-10 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-red-50 to-white z-0"></div>

                <div className="relative z-10">
                    <img
                        src={person.faceImage || "https://via.placeholder.com/100"}
                        alt={`${person.name}'s profile`}
                        className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white mx-auto mb-4"
                    />
                </div>

                <h3 className="text-2xl font-black text-gray-900 relative z-10">{person.name}</h3>
                <p className="text-gray-500 font-medium mb-4 relative z-10">{person.bio}</p>

                {/* Contact Section */}
                <div className="flex items-center gap-2 relative z-10 mt-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <input
                                value={editContact}
                                onChange={(e) => setEditContact(e.target.value)}
                                className="bg-white border border-gray-300 rounded-lg px-2 py-1 text-sm outline-none focus:border-red-500 w-40"
                                placeholder="Phone / Email"
                            />
                            <button onClick={handleSaveContact} className="text-xs font-bold text-green-600 hover:text-green-700 uppercase">Save</button>
                        </div>
                    ) : (
                        <>
                            <span className="text-sm font-bold text-gray-700">
                                {person.contact ? `📞 ${person.contact}` : "No contact info"}
                            </span>
                            <button onClick={() => setIsEditing(true)} className="text-xs text-red-500 font-bold underline ml-2">Edit</button>
                        </>
                    )}
                </div>

                {person.tags && person.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mt-4 relative z-10">
                        {person.tags.map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 text-xs font-bold text-red-500 bg-red-50 rounded-full border border-red-100">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="relative pl-8 ml-3 border-l-2 border-gray-200 space-y-8">
                {history.length > 0 ? history.map((h, i) => (
                    <div key={i} className="relative group">
                        {/* Dot */}
                        <div className="absolute top-1 -left-[43px] w-3 h-3 bg-red-500 rounded-full ring-4 ring-red-50"></div>

                        <div className="inline-block px-3 py-1 mb-2 text-[10px] font-bold tracking-wider text-gray-500 uppercase rounded bg-gray-100">
                            {new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {new Date(h.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>

                        <div className="mt-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                            <h3 className="mb-2 text-lg font-bold text-gray-900">Conversation Summary</h3>
                            <p className="mb-4 text-sm leading-relaxed text-gray-600 font-medium">
                                {h.summary}
                            </p>

                            {expandedItems[i] && (
                                <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Transcript</h4>
                                    <p className="text-sm italic text-gray-700 leading-relaxed font-serif">
                                        "{h.transcript || "No detailed transcript available."}"
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={() => toggleExpand(i)}
                                className="w-full py-3 text-sm font-black text-white uppercase tracking-wider rounded-xl bg-[#ff5c5c] hover:bg-red-600 shadow-sm transition-all active:scale-[0.98]"
                            >
                                {expandedItems[i] ? "Hide Details" : "Read Transcript"}
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="py-8 text-center text-gray-400 italic">No history yet. Start a conversation!</div>
                )}
            </div>
        </div>
    );
};

export default ConnectionHistory;
