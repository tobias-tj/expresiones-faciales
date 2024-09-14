import * as faceapi from "face-api.js";
import { useEffect } from "react";

export default function useLoadModel() {
  useEffect(() => {
    Promise.all([
      faceapi.loadTinyFaceDetectorModel("/models"),
      faceapi.loadFaceLandmarkModel("/models"),
      faceapi.loadFaceExpressionModel("/models"),
    ]).then(() => {
      console.log("Models loaded");
    });
  });
}
