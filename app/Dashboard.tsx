"use client";

import { useState } from "react";
import useSWR from "swr";

import Artwork from "./Artwork";
import CityOptionsList from "./CityOptionsList";
import Globe from "./Globe";
import { type City } from "@/data/cities";
import fetcher from "@/utils/fetcher";

export default function Dashboard() {
  // const { data } = useSWR("/api/openai/artwork", fetcher);

  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <main>
      <div className="flex">
        <div className="flex flex-col m-2">
          <Globe selectedCity={selectedCity} />
          <CityOptionsList
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
