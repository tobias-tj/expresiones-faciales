import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import { translateExpressionToEmoji } from "./lib/utils";
import ResultMessage from "./components/ResultMessage";
import useWebcam from "./hooks/useWebcam";
import useLoadModel from "./hooks/useLoadModel";
import * as faceapi from "face-api.js";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [expression, setExpression] = useState("");
  const [loading, setLoading] = useState(true);

  useWebcam(videoRef);
  useLoadModel();

  async function handleLoadedMetadata() {
    const videoElement = videoRef.current as HTMLVideoElement;
    const canvasElement = canvasRef.current as HTMLCanvasElement;

    if (!videoElement || !canvasElement) return;

    const detection = await faceapi
      .detectSingleFace(
        videoElement as HTMLVideoElement,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceLandmarks()
      .withFaceExpressions();
    console.log(detection);

    if (detection) {
      const dominantExpression = detection.expressions.asSortedArray()[0];

      setExpression(dominantExpression.expression);

      const dimensions = {
        width: videoElement.offsetWidth,
        height: videoElement.offsetHeight,
      };

      faceapi.matchDimensions(canvasElement, dimensions);
      const resizedResults = faceapi.resizeResults(detection, dimensions);

      faceapi.draw.drawDetections(canvasElement, resizedResults);
      faceapi.draw.drawFaceLandmarks(canvasElement, resizedResults);
      faceapi.draw.drawFaceExpressions(canvasElement, resizedResults);
      setLoading(false);
    }

    setTimeout(handleLoadedMetadata, 1000);
  }

  return (
    <main className="container flex flex-col items-center min-h-screen p-10 mx-auto lg:flex-row md:justify-between gap-14 xl:gap-40">
      <Header />
      <section className="flex flex-col flex-1 w-full gap-6">
        <div className="p-2 bg-white rounded-xl">
          <div className="relative flex items-center justify-center w-full aspect-video">
            {/* Substitua pela Webcam */}
            <div className="w-full bg-gray-300 rounded-lg aspect-video">
              <div className="relative">
                <video
                  onLoadedMetadata={handleLoadedMetadata}
                  ref={videoRef}
                  autoPlay
                ></video>
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                ></canvas>
              </div>
            </div>
            {/* Substitua pela Webcam */}
          </div>
        </div>
        <div
          className={`bg-white rounded-xl px-8 py-6 flex gap-6 lg:gap-20 items-center h-[200px] ${
            loading ? "justify-center" : "justify-between"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center text-6xl text-amber-300">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <span className="lg:text-[100px] text-6xl">
                {expression && translateExpressionToEmoji(expression)}
              </span>
              <h3 className="text-xl text-right lg:text-4xl md:text-3xl text-neutral-500 font-secondary">
                <ResultMessage expression={expression} />
              </h3>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
