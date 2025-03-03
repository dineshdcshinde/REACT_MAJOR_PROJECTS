import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
  const { roomid } = useParams();

  const myMeetings = async (element) => {
    const appId = 1613467019;
    const ServerSecret = "0bc878b74eb22e0156bff8e3db06032b";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      ServerSecret,
      roomid,
      Date.now().toString(),
      "Person1"
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      sharedLinks: [
        {
          name: "Copy Link",
          url: `https://localhost:5173/room/${roomid}`,
        },
      ],
    });
  };

  return (
    <div className="h-screen w-full bg-[#3c3c3c] flex justify-center items-center">
      <div ref={myMeetings} />
    </div>
  );
};

export default Room;
