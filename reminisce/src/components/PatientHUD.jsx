import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import Logo from "../assets/Logo.svg"
import { Menu, Camera } from 'lucide-react';
import { useFace } from '../context/FaceContext';
import Sidebar from './Sidebar';

const PatientHUD = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const {
        webcamRef,
        currentFace,
        lastEmotion,
        transcript,
        listening,
        setIsCameraActive,
        isConsentOpen,
        handleConsentNo,
        enrollAndStart
    } = useFace();

    const [consentStep, setConsentStep] = useState(1); // 1: Ask, 2: Name
    const [newName, setNewName] = useState('');

    // Reset popup state when it opens
    useEffect(() => {
        if (isConsentOpen) {
            setConsentStep(1);
            setNewName('');
        }
    }, [isConsentOpen]);

    // Activate camera when component mounts
    useEffect(() => {
        setIsCameraActive(true);
        return () => setIsCameraActive(false);
    }, [setIsCameraActive]);

    return (
        <div className="h-full relative p-5 overflow-y-auto">
            {showMenu && <Sidebar onClose={() => setShowMenu(false)} />}

            {/* Consent Modal Overlay */}
            {isConsentOpen && (
                <div className="absolute inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
                    <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-red-50 rounded-full">
                                <Camera className="w-8 h-8 text-primary-red" />
                            </div>
                        </div>

                        {consentStep === 1 ? (
                            <div className="text-center">
                                <h2 className="text-2xl font-black text-gray-900 mb-2">New Person Detected</h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    A new person is here. Do they give consent to be recorded for your memory aid?
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={handleConsentNo}
                                        className="py-4 rounded-2xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
                                    >
                                        No, thanks
                                    </button>
                                    <button
                                        onClick={() => setConsentStep(2)}
                                        className="py-4 rounded-2xl bg-[#ff3b3b] text-white font-black hover:bg-red-700 shadow-xl shadow-red-200/50 transition-all active:scale-95 border-b-4 border-red-800"
                                    >
                                        Yes, record
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <h2 className="text-2xl font-black text-gray-900 mb-2">Wonderful!</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    What is the name of this person?
                                </p>
                                <input
                                    autoFocus
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Enter Name"
                                    className="w-full p-4 mb-6 bg-gray-50 border-2 border-gray-400 rounded-2xl text-lg font-bold text-gray-900 outline-none focus:border-red-500 transition-all"
                                />
                                <button
                                    disabled={!newName.trim()}
                                    onClick={() => enrollAndStart(newName)}
                                    className="w-full py-4 rounded-2xl bg-[#ff3b3b] text-white font-black hover:bg-red-700 shadow-xl shadow-red-200/50 transition-all disabled:opacity-50 disabled:scale-100 active:scale-95 border-b-4 border-red-800"
                                >
                                    Finish & Start
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Top Bar - Overlay */}
            <div className="top-0 left-0 w-full z-20 mb-5 flex items-center justify-between">
                <Menu onClick={() => setShowMenu(true)} className="cursor-pointer" />
                <img src={Logo} className='w-40 ' alt="Logo" />
                <Camera onClick={() => { }} className="text-primary-red cursor-pointer" />
            </div>

            <div className=" h-9/10 relative">
                <Webcam
                    ref={webcamRef}
                    className="rounded-2xl absolute inset-0 w-full h-full object-cover"
                    videoConstraints={{ facingMode: "user" }}
                />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-8 pointer-events-none z-10">
                {currentFace && (
                    <div className="absolute bottom-0 self-center w-8/10 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl mb-20 border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full tracking-wide">
                                Connection detected
                            </span>
                            {lastEmotion && <span className="text-sm font-medium text-gray-500">Mood: {lastEmotion}</span>}
                        </div>

                        <h2 className="text-3xl font-black text-gray-900 mb-1">{currentFace}</h2>

                        <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Live Transcript</p>
                            <p className="text-sm text-gray-700 font-medium leading-relaxed italic">
                                "{transcript.substring(transcript.length - 80) || "Listening..."}..."
                            </p>
                        </div>
                    </div>
                )}

                {!currentFace && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/40 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                            <span className="text-xl text-white font-medium animate-pulse tracking-wide">Scanning for faces...</span>
                        </div>
                    </div>
                )}

                {listening && (
                    <div className="absolute right-10 top-24 px-4 py-2 font-bold text-white shadow-lg bg-red-500 rounded-full animate-pulse shadow-red-500/50 flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                        Listening
                    </div>
                )}
            </div>

            {/* Secret button to exit to Admin */}
            <button
                className="absolute text-transparent top-0 right-0 w-16 h-16 z-50 cursor-pointer"
                onClick={() => navigate('/admin')}
            ></button>
        </div>
    );
};

export default PatientHUD;
