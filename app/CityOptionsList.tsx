"use client";

import type { Cities } from "@/data/cities";
import { toTitleCase } from "@/utils/common";

type Props = {
  cities: Cities;
};

export default function CityOptionsList({ cities }: Props) {
  return (
    <div className="grid justify-center grid-cols-3 gap-1">
      {Object.entries(cities).map(([city, { id }]) => (
        <button
          key={city}
          className="col-span-1 px-1 py-1 text-sm font-semibold text-gray-700 bg-white border border-gray-600 rounded-sm hover:bg-gray-100"
          onClick={() => {
            console.log(id);
          }}
        >
          {toTitleCase(city)}
        </button>
      ))}
    </div>
  );
}
