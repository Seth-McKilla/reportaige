"use client";

import { useState } from "react";

import Artwork from "./Artwork";
import CityOptionsList from "./CityOptionsList";
import Globe from "./Globe";
import { cities, type City } from "@/data/cities";

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <main>
      <div className="flex">
        <div className="flex flex-col m-2">
          <Globe cities={cities} selectedCity={selectedCity} />
          <CityOptionsList
            cities={cities}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </div>
        <div className="flex items-end m-2">
          <Artwork selectedCity={selectedCity} />
        </div>
      </div>
    </main>
  );
}
