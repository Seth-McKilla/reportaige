"use client";

import createGlobe, { type Marker } from "cobe";
import { useEffect, useRef } from "react";

import type { Cities, City } from "@/data/cities";

type Props = {
  cities: Cities;
  selectedCity: City | null;
};

export default function Globe({ cities, selectedCity }: Props) {
  const markers = Object.entries(cities).map(([, { lat, lng }]) => ({
    location: [lat, lng],
    size: 0.1,
  })) as Marker[];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const focusRef = useRef([0, 0]);

  useEffect(() => {
    let width = 0;
    let phi = 0;
    let theta = 0;
    const doublePi = Math.PI * 2;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 200 / 255, 21 / 255],
      glowColor: [1.2, 1.2, 1.2],
      markers,
      onRender: (state) => {
        state.phi = phi;
        state.theta = theta;

        if (!selectedCity) {
          phi += 0.01;
        } else {
          const [focusPhi, focusTheta] = focusRef.current;
          const distPositive = (focusPhi - phi + doublePi) % doublePi;
          const distNegative = (phi - focusPhi + doublePi) % doublePi;
          // Control the speed
          if (distPositive < distNegative) {
            phi += distPositive * 0.08;
          } else {
            phi -= distNegative * 0.08;
          }
          theta = theta * 0.92 + focusTheta * 0.08;
          state.width = width * 2;
          state.height = width * 2;
        }
      },
    });
    setTimeout(() => (canvasRef.current!.style.opacity = "1"));
    return () => globe.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);
  return (
    <div className="flex align-top">
      <canvas
        ref={canvasRef}
        style={{ width: 500, height: 500, aspectRatio: 1 }}
      />
    </div>
  );
}
