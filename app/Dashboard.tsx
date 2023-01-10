"use client";

import { useState } from "react";

import Artwork from "./Artwork";
import CityOptionsList from "./CityOptionsList";
import Globe from "./Globe";
import type { City } from "@/data/cities";
import type { ArtworkScenesByCity } from "@/lib/openai";

type Props = {
  artworkByCity: ArtworkScenesByCity;
};

export default function Dashboard({ artworkByCity }: Props) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const artworkInfo = selectedCity && artworkByCity[selectedCity];

  return (
    <main>
      <div className="flex">
        <div className="flex flex-col m-4">
          <Globe artworkByCity={artworkByCity} selectedCity={selectedCity} />
          <CityOptionsList
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </div>
        <div className="flex items-start m-4">
          <Artwork artworkInfo={artworkInfo} />
        </div>
      </div>
    </main>
  );
}
