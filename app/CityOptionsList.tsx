"use client";

import type { Cities, City } from "@/data/cities";
import { toTitleCase } from "@/utils/common";

type Props = {
  cities: Cities;
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
};

export default function CityOptionsList({
  cities,
  selectedCity,
  setSelectedCity,
}: Props) {
  return (
    <div className="grid justify-center grid-cols-3 gap-1">
      {Object.entries(cities).map(([city]) => {
        let buttonStyle =
          "px-1 py-1 text-sm font-semibold bg-white border border-gray-800 rounded-sm hover:bg-gray-200";
        if (selectedCity === city)
          buttonStyle += " text-white bg-black hover:bg-gray-800";

        return (
          <button
            key={city}
            value={city}
            className={buttonStyle}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setSelectedCity(e.currentTarget.value as City);
            }}
          >
            {toTitleCase(city)}
          </button>
        );
      })}
    </div>
  );
}
