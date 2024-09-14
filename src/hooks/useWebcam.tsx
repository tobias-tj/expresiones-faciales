import React, { useEffect } from "react";

export default function useWebcam(videoRef: React.RefObject<HTMLVideoElement>) {
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.srcObject = stream;
      }
    });
  }, []);
}
