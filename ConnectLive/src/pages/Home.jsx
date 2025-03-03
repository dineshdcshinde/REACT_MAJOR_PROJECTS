import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = ()=>{
    if(!roomCode) return alert("Please enter a room code")
    navigate(`/room/${roomCode}`);
  }
  const handleSubmit = (e)=>{
   e.preventDefault()



    handleJoin();
  }



  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Enter Room</h1>
        <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-500"
            required
          />
          <button
          type="submit"
            onClick={handleJoin}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Join
          </button>
      </div>
        </form>
    </div>
  );
};

export default Home;
