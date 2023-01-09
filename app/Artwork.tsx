import Image from "next/image";

import { cities, type City } from "@/data/cities";
import { findCity } from "@/utils/location";

type Props = {
  selectedCity: City | null;
};

export default function Artwork({ selectedCity }: Props) {
  let containerStyles =
    "flex items-center justify-center text-center rounded-lg w-[512px] h-[512px]";
  let borderStyles = " border-4 border-gray-500 border-dashed";
  if (!selectedCity) containerStyles += borderStyles;

  return (
    <div className={containerStyles}>
      {selectedCity ? (
        <Image
          src={"https://avatars.githubusercontent.com/u/63591760?v=4"}
          alt="Artwork"
          width={512}
          height={512}
        />
      ) : (
        <p className="text-xl font-semibold text-gray-600">Select a City</p>
      )}
    </div>
  );
}
