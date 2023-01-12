"use client";

import { useState } from "react";

import Artwork from "./Artwork";
import CityOptionsList from "./CityOptionsList";
import Globe from "./Globe";
import { findCity } from "@/utils/location";

type Props = {
  citiesWithArtwork: CityWithArtwork[];
};

export default function Dashboard({ citiesWithArtwork }: Props) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const cityWithArtwork =
    selectedCity && findCity(selectedCity, citiesWithArtwork);

  return (
    <main>
      <div className="flex">
        <div className="flex flex-col m-4">
          <Globe
            citiesWithArtwork={citiesWithArtwork}
            cityWithArtwork={cityWithArtwork}
          />
          <CityOptionsList
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            citiesWithArtwork={citiesWithArtwork}
          />
        </div>
        <div className="flex flex-col items-start m-4">
          <Artwork cityWithArtwork={cityWithArtwork} />
          {cityWithArtwork && (
            <p className="w-full mt-4 text-center max-w-[512px]">
              {cityWithArtwork.artwork.description}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
