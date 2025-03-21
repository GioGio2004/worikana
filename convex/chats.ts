// import { useState, useEffect, useRef } from 'react'
// import { Button } from './ui/button';

// function Speech() {
//   const [isListening, setIsListening] = useState(false)
//   const [userSpeech, setUserSpeech] = useState("")
//   const recognitionRef = useRef<any>(null);

//   // Initialize speech recognition
//   useEffect(() => {
//     // Check browser support
//     if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
//       console.error('Speech recognition is not supported in this browser');
//       return;
//     }

//     // Create speech recognition instance
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     recognitionRef.current = new SpeechRecognition();
    
//     // Configure
//     recognitionRef.current.continuous = true;
//     recognitionRef.current.interimResults = true;
//     recognitionRef.current.lang = 'en-US';

//     // Set up event handlers
//     recognitionRef.current.onstart = () => {
//       console.log('Speech recognition started');
//       setIsListening(true);
//     };

//     recognitionRef.current.onend = () => {
//       console.log('Speech recognition ended');
//       setIsListening(false);
      
//       // Restart if still listening (not manually stopped)
//       if (isListening) {
//         try {
//           recognitionRef.current.start();
//         } catch (e) {
//           console.error('Error restarting speech recognition:', e);
//         }
//       }
//     };

//     recognitionRef.current.onerror = (event: any) => {
//       console.error('Speech recognition error:', event.error);
//     };

//     recognitionRef.current.onresult = (event: any) => {
//       let interimTranscript = '';
//       let finalTranscript = '';

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
        
//         if (event.results[i].isFinal) {
//           finalTranscript += transcript + ' ';
//           console.log('User said:', transcript);
//         } else {
//           interimTranscript += transcript;
//         }
//       }

//       // Only append final transcripts to the state to avoid jittery UI
//       if (finalTranscript) {
//         setUserSpeech((prev) => prev + finalTranscript);
//       }
//     };

//     // Cleanup on unmount
//     return () => {
//       if (recognitionRef.current) {
//         try {
//           recognitionRef.current.stop();
//         } catch (e) {
//           // Ignore errors on cleanup
//         }
//       }
//     };
//   }, [isListening]);

//   const startListening = () => {
//     if (!recognitionRef.current) {
//       console.error('Speech recognition not supported or not initialized');
//       return;
//     }

//     try {
//       recognitionRef.current.start();
//       console.log("Speech recognition started successfully");
//     } catch (error) {
//       console.error("Error starting speech recognition:", error);
//     }
//   }

//   const stopListening = () => {
//     if (!recognitionRef.current) return;

//     try {
//       recognitionRef.current.stop();
//       setIsListening(false);
//       console.log("Speech recognition stopped");
//     } catch (error) {
//       console.error("Error stopping speech recognition:", error);
//     }
//   }

//   return (
//     <div className="container p-6">
//       <h1 className="text-2xl font-bold mb-4">Web Speech API Demo</h1>
//       <div className="button-container space-x-4 mb-4">
//         <Button 
//           onClick={startListening} 
//           disabled={isListening}
//           className="bg-black"
//         >
//           Start Listening
//         </Button>
//         <Button
//           onClick={stopListening} 
//           disabled={!isListening}
//           className="bg-black"
//         >
//           Stop Listening
//         </Button>
//       </div>
//       <p className="mb-4">{isListening ? 'Listening...' : 'Not listening'}</p>
      
//       {/* Display the transcribed speech */}
//       <div className="speech-container border rounded-md p-4 mt-6">
//         <h2 className="text-xl font-semibold mb-2">User Speech:</h2>
//         <div className="speech-box  p-4 rounded min-h-24">
//           {userSpeech || "No speech detected yet. Try saying something."}
//         </div>
//       </div>

//       <div className="mt-6 text-sm text-gray-600">
//         <p>Note: This component uses the Web Speech API which is built into modern browsers.</p>
//         <p>It works best in Chrome and Edge browsers. Microphone permission is required.</p>
//       </div>
//     </div>
//   )
// }

// // Add TypeScript declarations for the Web Speech API
// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
// }

// export default Speech