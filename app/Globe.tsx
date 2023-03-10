import createGlobe, { type Marker } from "cobe";
import { useEffect, useRef } from "react";

import { locationToAngles } from "@/utils/location";

type Props = {
  cityWithArtwork: CityWithArtwork | null;
  citiesWithArtwork: CityWithArtwork[];
};

export default function Globe({ cityWithArtwork, citiesWithArtwork }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const focusRef = useRef([0, 0]);
  const rotation = useRef({ phi: 0, theta: 0 });

  const totalTweetCount = citiesWithArtwork.reduce(
    (acc, city) => acc + city.artwork.totalTweets,
    0
  );

  const markers = citiesWithArtwork.map((city) => ({
    location: [city.lat, city.lng],
    size: (city.artwork.totalTweets / totalTweetCount) * 3,
  })) as Marker[];

  useEffect(() => {
    let width = 0;

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
        state.phi = rotation.current.phi;
        state.theta = rotation.current.theta;

        if (!cityWithArtwork) {
          rotation.current.phi += 0.005;
        } else {
          const [focusPhi, focusTheta] = focusRef.current;
          const distPositive =
            (focusPhi - rotation.current.phi + doublePi) % doublePi;
          const distNegative =
            (rotation.current.phi - focusPhi + doublePi) % doublePi;
          // Control the speed
          if (distPositive < distNegative) {
            rotation.current.phi += distPositive * 0.04;
          } else {
            rotation.current.phi -= distNegative * 0.04;
          }
          rotation.current.theta =
            rotation.current.theta * 0.92 + focusTheta * 0.08;
          state.width = width * 2;
          state.height = width * 2;

          focusRef.current = locationToAngles(
            cityWithArtwork.lat,
            cityWithArtwork.lng
          );
        }
      },
    });
    setTimeout(() => (canvasRef.current!.style.opacity = "1"));
    return () => globe.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityWithArtwork]);
  return (
    <div className="flex -mt-[200px] sm:mt-0 lg:mb-6 align-top w-[385px] h-[385px] sm:w-[512px] sm:h-[512px]">
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: 1,
          opacity: 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </div>
  );
}
