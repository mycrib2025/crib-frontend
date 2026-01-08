import { useEffect } from "react";

export default function useAudioPulse() {
  useEffect(() => {
    let audioCtx;
    let analyser;
    let dataArray;
    let source;

    async function startAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        audioCtx = new (window.AudioContext ||
          window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;

        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        dataArray = new Uint8Array(analyser.frequencyBinCount);

        const pulse = () => {
          analyser.getByteFrequencyData(dataArray);

          const avg =
            dataArray.reduce((a, b) => a + b, 0) /
            dataArray.length;

          // Convert audio energy → animation speed
          const speed = Math.max(4, 20 - avg / 10);

          document.documentElement.style.setProperty(
            "--pulse-speed",
            `${speed}s`
          );

          requestAnimationFrame(pulse);
        };

        pulse();
      } catch (err) {
        console.error("Audio access denied", err);
      }
    }

    startAudio();
  }, []);
}