"use client";

import type { Cities } from "@/data/cities";

type Props = {
  cities: Cities;
};

export default function CityOptionsList({ cities }: Props) {
  return (
    <div className="flex justify-center mt-16">
      {Object.entries(cities).map(([city, { lat, lng }]) => (
        <button
          key={city}
          className="px-4 py-2 mx-1 text-sm font-semibold text-gray-700 bg-white border border-gray-600 rounded-sm hover:bg-gray-100"
          onClick={() => {
            console.log(lat, lng);
          }}
        >
          {city}
        </button>
      ))}
    </div>
  );
}
