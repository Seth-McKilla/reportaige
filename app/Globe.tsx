"use client";

import createGlobe, { type Marker } from "cobe";
import { useEffect, useRef } from "react";

import type { Cities } from "@/data/cities";

type Props = {
  cities: Cities;
};

export default function Globe({ cities }: Props) {
  const markers = Object.entries(cities).map(([, { lat, lng }]) => ({
    location: [lat, lng],
    size: 0.1,
  })) as Marker[];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: 1200,
      height: 1200,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex">
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, aspectRatio: 1 }}
      />
    </div>
  );
}
