"use client";

import { useState } from "react";

import Artwork from "./Artwork";
import CityOptionsList from "./CityOptionsList";
import Globe from "./Globe";

type Props = {
  artwork: ArtworkScenesByCity;
};

export default function Dashboard({ artwork }: Props) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const artworkInfo = selectedCity && artwork[selectedCity];

  return (
    <main>
      <div className="flex">
        <div className="flex flex-col m-4">
          <Globe artwork={artwork} selectedCity={selectedCity} />
          <CityOptionsList
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </div>
        <div className="flex flex-col items-start m-4">
          <Artwork artworkInfo={artworkInfo} />
          {artworkInfo && (
            <p className="w-full mt-4 text-center max-w-[512px]">
              {artworkInfo.description}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
