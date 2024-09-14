import { useEffect, useRef } from "react";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.srcObject = stream;
        videoElement.play();
      }
    });
  }, []);

  return (
    <main className="container flex flex-col items-center min-h-screen p-10 mx-auto lg:flex-row md:justify-between gap-14 xl:gap-40">
      <Header />
      <section className="flex flex-col flex-1 w-full gap-6">
        <div className="p-2 bg-white rounded-xl">
          <div className="relative flex items-center justify-center w-full aspect-video">
            {/* Substitua pela Webcam */}
            <div className="w-full bg-gray-300 rounded-lg aspect-video">
              <video ref={videoRef}></video>
            </div>
            {/* Substitua pela Webcam */}
          </div>
        </div>
        <div
          className={`bg-white rounded-xl px-8 py-6 flex gap-6 lg:gap-20 items-center h-[200px] justify-center`}
        >
          <p className="flex items-center justify-center text-4xl text-center text-yellow-300">
            {/* Substitua pelo texto */}
            <LoadingSpinner />
            {/* Substitua pelo texto */}
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;
