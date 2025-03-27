import { useState } from 'react';
import Vapi from "@vapi-ai/web";
import { Button } from './ui/button';
import { Mic, MicOff } from 'lucide-react';

const vapi = new Vapi("13f7a393-652d-4de8-8252-31c9eebd3dd3");

function Speech() {
  const [isCallActive, setIsCallActive] = useState(false);

  const startCall = async () => {
    try {
      await vapi.start("395da044-6e5b-4a24-b35f-4e6e7b362012");
      setIsCallActive(true);
      console.log("Call started successfully");
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const stopCall = async () => {
    try {
      vapi.stop();
      setIsCallActive(false);
      console.log("Call stopped");
    } catch (error) {
      console.error("Error stopping call:", error);
    }
  };

  return (
    <>
      {!isCallActive ? (
        <Button
          onClick={startCall}
          type="button"
          className="flex-none bg-slate-700 hover:bg-slate-600 text-orange-400 h-8 sm:h-10 w-8 sm:w-10 p-0 rounded-lg"
          title="Start voice chat"
        >
          <Mic size={16} className="sm:size-5" />
        </Button>
      ) : (
        <Button
          onClick={stopCall}
          type="button"
          className="flex-none bg-orange-500 hover:bg-orange-600 text-slate-900 h-8 sm:h-10 w-8 sm:w-10 p-0 rounded-lg animate-pulse"
          title="End voice chat"
        >
          <MicOff size={16} className="sm:size-5" />
        </Button>
      )}
    </>
  );
}

export default Speech;
