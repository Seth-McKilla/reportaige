"use client";

import Artwork from "./Artwork";
import CityOptionsList from "./CityOptionsList";
import Globe from "./Globe";
import cities from "@/data/cities";

export default function Dashboard() {
  return (
    <main>
      <div className="flex">
        <div className="flex flex-col m-2">
          <Globe cities={cities} />
          <CityOptionsList cities={cities} />
        </div>
        <div className="flex items-end m-2">
          <Artwork />
        </div>
      </div>
    </main>
  );
}
