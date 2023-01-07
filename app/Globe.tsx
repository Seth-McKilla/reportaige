"use client";

import createGlobe, { type Marker } from "cobe";
import { useEffect, useRef } from "react";

import cities from "@/data/cities";

const markers = Object.entries(cities).map(([, { lat, lng }]) => ({
  location: [lat, lng],
  size: 0.1,
})) as Marker[];

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers,
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1000,
        aspectRatio: 1,
        margin: "auto",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
}
