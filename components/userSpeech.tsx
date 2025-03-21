import { useState } from 'react'
import Vapi from "@vapi-ai/web";
import { Button } from './ui/button';

const vapi = new Vapi("13f7a393-652d-4de8-8252-31c9eebd3dd3");

function Speech() {
  const [isCallActive, setIsCallActive] = useState(false)

  const startCall = async () => {
    try {
      await vapi.start("9bf48c1d-9db3-4ca1-8d56-e62f0c8c9ab8")
      setIsCallActive(true)
      console.log("Call started successfully");
    } catch (error) {
      console.error("Error starting call:", error);
    }
  }

  const stopCall = async () => {
    try {
      vapi.stop()
      setIsCallActive(false)
      console.log("Call stopped");
    } catch (error) {
      console.error("Error stopping call:", error);
    }
  }

  return (
    <div className="container">
        <div className="button-container">
        <Button 
          onClick={startCall} 
          disabled={isCallActive}
          className="bg-black"
        >
          Start Call
        </Button>
        <Button
          onClick={stopCall} 
          disabled={!isCallActive}
          className="bg-black"
        >
          Stop Call
        </Button>
      </div>
     
    </div>
  )
}

export default Speech