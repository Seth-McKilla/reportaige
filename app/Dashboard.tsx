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
    <main className="flex flex-col-reverse items-center justify-center lg:flex-row">
      <div className="flex flex-col-reverse justify-center m-4 lg:flex-col">
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
      <div className="flex flex-col items-center justify-center m-4">
        <Artwork cityWithArtwork={cityWithArtwork} />
        {cityWithArtwork && (
          <div className="flex flex-wrap items-center justify-center max-w-[512px]">
            {cityWithArtwork.artwork.hashtags.map((hashtag) => (
              <a
                key={hashtag}
                href={`https://twitter.com/hashtag/${hashtag}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-2 py-1 mx-1 mt-2 text-sm font-bold text-white bg-blue-500 rounded-full"
              >
                {`#${hashtag}`}
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
