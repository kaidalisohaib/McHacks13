import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useFaceRecognition } from './hooks/useFaceRecognition';
import { useGemini } from './hooks/useGemini';
import AdminPanel from './components/AdminPanel';
import PatientHUD from './components/PatientHUD';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Connections from './components/Connections';
import ConnectionHistory from './components/ConnectionHistory';
import './index.css';

function App() {
  // --- STATE ---
  // Modes: LOGIN, DASHBOARD, CAMERA, ADMIN, CONNECTIONS, HISTORY
  const [mode, setMode] = useState('LOGIN');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Patient State
  const [currentFace, setCurrentFace] = useState(null);
  const [lastEmotion, setLastEmotion] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  // --- HOOKS ---
  const {
    modelsLoaded,
    knownFaces,
    addFace,
    detectFace,
    updateKnownFaces
  } = useFaceRecognition();

  const { getGreeting, processMemory } = useGemini();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening
  } = useSpeechRecognition();

  // --- REFS ---
  const webcamRef = useRef(null);
  const recognitionInterval = useRef(null);
  const faceLossTimeoutRef = useRef(null);
  const processingRef = useRef(false);
  const currentFaceRef = useRef(null);
  const transcriptRef = useRef("");

  // Sync ref with transcript
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  // --- HELPER LOGIC ---
  const startRecording = () => {
    if (!browserSupportsSpeechRecognition) return;
    resetTranscript();
    setIsRecording(true);
    console.log("🎤 START RECORDING", browserSupportsContinuousListening);
    if (browserSupportsContinuousListening) {
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    } else {
      SpeechRecognition.startListening({ language: 'en-US' });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    SpeechRecognition.stopListening();
    const final = transcriptRef.current;
    console.log("🎤 FINAL TRANSCRIPT:", final);
    return final;
  };

  const speak = async (text) => {
    if (!text) return;
    const apiKey = import.meta.env.VITE_ELEVEN_KEY;
    const voiceId = import.meta.env.VITE_VOICE_ID;

    try {
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        { text: text, model_id: "eleven_monolingual_v1" },
        { headers: { 'xi-api-key': apiKey }, responseType: 'blob' }
      );
      const audio = new Audio(URL.createObjectURL(response.data));
      audio.onended = () => {
        if (mode === 'CAMERA' && currentFaceRef.current) {
          SpeechRecognition.startListening({ continuous: true });
        }
      };
      audio.play();
    } catch (e) {
      console.error("TTS Error:", e);
    }
  };

  // --- CORE LOGIC ---
  const handleFaceDetected = async (name, imageSrc) => {
    if (currentFaceRef.current !== name) {
      console.log(`Detected Switch: ${name}`);

      // 1. Process previous person
      if (isRecording && currentFaceRef.current) {
        const finalTranscript = transcriptRef.current;
        stopRecording();
        handleProcessMemory(currentFaceRef.current, finalTranscript);
      }

      // 2. Set new session
      setCurrentFace(name);
      currentFaceRef.current = name;

      // 3. Greet
      // Removed time check
      const person = knownFaces.find(p => p.name === name);
      const lastMood = person?.history?.slice(-1)[0]?.emotion || "Neutral";
      const greeting = await getGreeting(name, person?.bio, person?.history, lastMood, imageSrc);
      speak(greeting);

      // 4. Start Listening
      if (!isRecording) startRecording();
    }

    // Reset loss timeout
    if (faceLossTimeoutRef.current) {
      clearTimeout(faceLossTimeoutRef.current);
      faceLossTimeoutRef.current = null;
    }
  };

  const handleFaceLost = () => {
    if (currentFaceRef.current && isRecording && !faceLossTimeoutRef.current) {
      console.log("Face lost. Waiting 5s...");
      faceLossTimeoutRef.current = setTimeout(async () => {
        console.log("Timeout. Processing memory.");
        const nameToProcess = currentFaceRef.current;
        const finalTranscript = transcriptRef.current;

        setCurrentFace(null);
        currentFaceRef.current = null;
        setLastEmotion(null);
        stopRecording();

        await handleProcessMemory(nameToProcess, finalTranscript);
      }, 5000);
    }
  };

  const handleProcessMemory = async (name, text) => {
    const result = await processMemory(name, text);
    if (result && result.summary) {
      updateKnownFaces(name, result);
      setLastEmotion(result.emotion);
    }
  };

  // --- LOOP ---
  useEffect(() => {
    if (mode === 'CAMERA' && modelsLoaded) {
      recognitionInterval.current = setInterval(async () => {
        if (webcamRef.current && !processingRef.current) {
          processingRef.current = true;
          const match = await detectFace(webcamRef);
          processingRef.current = false;

          if (match) {
            await handleFaceDetected(match.name, match.imageSrc);
          } else {
            handleFaceLost();
          }
        }
      }, 1000);
    } else {
      // Clean up on exit
      if (recognitionInterval.current) clearInterval(recognitionInterval.current);
      if (isRecording) stopRecording();

      currentFaceRef.current = null;
      setCurrentFace(null);
      setLastEmotion(null);
      resetTranscript();
    }
    return () => clearInterval(recognitionInterval.current);
  }, [mode, modelsLoaded, knownFaces, isRecording]);

  // --- NAVIGATION ---
  const handleNavigate = (newMode) => {
    setMode(newMode);
    setShowMenu(false);
  };

  // --- RENDER ---
  if (!modelsLoaded) return <div className="loading">Initializing Neural Engine...</div>;

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {mode === 'LOGIN' && (
        <LoginScreen onLogin={() => setMode('DASHBOARD')} />
      )}

      {mode === 'DASHBOARD' && (
        <Dashboard
          user="Pierre"
          connections={knownFaces}
          onOpenMenu={() => setShowMenu(true)}
          onCamera={() => setMode('CAMERA')}
          onSelectPerson={(person) => {
            setSelectedPerson(person);
            setMode('HISTORY');
          }}
        />
      )}

      {mode === 'CONNECTIONS' && (
        <Connections
          connections={knownFaces}
          onOpenMenu={() => setShowMenu(true)}
          onCamera={() => setMode('CAMERA')}
          onSelectPerson={(person) => {
            setSelectedPerson(person);
            setMode('HISTORY');
          }}
        />
      )}

      {mode === 'HISTORY' && (
        <ConnectionHistory
          person={selectedPerson}
          onOpenMenu={() => setShowMenu(true)}
          onCamera={() => setMode('CAMERA')}
          onBack={() => setMode('DASHBOARD')} // Or previous mode, simplify to Dashboard for now
        />
      )}

      {mode === 'CAMERA' && (
        <PatientHUD
          webcamRef={webcamRef}
          currentFace={currentFace}
          lastEmotion={lastEmotion}
          transcript={transcript}
          listening={listening}
          setMode={setMode} // Allows exiting via secret button
          onOpenMenu={() => setShowMenu(true)}
          onCamera={() => setMode('CAMERA')}
        />
      )}

      {mode === 'ADMIN' && (
        <AdminPanel
          webcamRef={webcamRef}
          knownFaces={knownFaces}
          addFace={addFace}
          setMode={setMode}
        />
      )}

      {/* Sidebar Overlay */}
      {showMenu && (
        <Sidebar
          onClose={() => setShowMenu(false)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

export default App;
