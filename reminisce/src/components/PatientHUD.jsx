import React, { useState } from 'react';
import Logo from "../assets/Logo.svg"
import { Menu, Camera } from 'lucide-react';
import Webcam from 'react-webcam';

const PatientHUD = ({
    webcamRef,
    currentFace,
    lastEmotion,
    transcript,
    listening,
    setMode,
    onOpenMenu,
    onCamera,
}) => {
    return (
        <div className="h-screen p-5">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
                <Menu onClick={onOpenMenu} />
                <img src={Logo} className='w-40' />
                <Camera onClick={onCamera} />
            </div>
            
            <Webcam
                ref={webcamRef}
                className="object-cover w-full h-full rounded-2xl"
                videoConstraints={{ facingMode: "user" }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-between p-8 pointer-events-none">
                {currentFace ? (
                    <div className="w-90 h-30 bg-white border-success shadow-2xl absolute bottom-2 m-auto z-90 rounded-2xl flex flex-col justify-center items-center">
                        <p className='badge badge-outline'>Connection detected !</p>
                        <h2 className="text-3xl font-bold text-black">{currentFace}</h2>
                        {lastEmotion && <span className="inline-block mt-2 text-lg font-medium text-blue-400">Mood: {lastEmotion}</span>}
                        <div className="mt-2 text-sm text-black">
                            Live Transcript: {transcript.substring(transcript.length - 50)}...
                        </div>
                    </div>
                ) : (
                    <div className="text-2xl text-white opacity-70 animate-pulse">Scanning...</div>
                )}

                {listening && (
                    <div className="absolute top-25 self-end px-4 py-2 font-bold text-white shadow-lg bg-red-500 rounded-full animate-pulse shadow-red-500/50">
                        ● Listening
                    </div>
                )}
            </div>

            <button className="absolute top-0 right-0 z-50 w-12 h-12 bg-transparent border-none cursor-pointer" onClick={() => setMode('ADMIN')}></button>
        </div>
    );
};

export default PatientHUD;
