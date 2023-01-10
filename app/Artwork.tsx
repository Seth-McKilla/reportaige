import Image from "next/image";

import type { FormattedTrend } from "@/lib/openai";

type Props = {
  artworkInfo: FormattedTrend | null;
};

export default function Artwork({ artworkInfo }: Props) {
  let containerStyles =
    "flex items-center justify-center text-center rounded-lg w-[512px] h-[512px]";
  let borderStyles = " border-4 border-gray-500 border-dashed";
  if (!artworkInfo) containerStyles += borderStyles;

  return (
    <div className={containerStyles}>
      {artworkInfo?.imageUrl ? (
        <Image
          src={artworkInfo.imageUrl}
          alt={artworkInfo.description || "Artwork"}
          placeholder="blur"
          blurDataURL={artworkInfo.imageUrl}
          width={512}
          height={512}
        />
      ) : (
        <p className="text-xl font-semibold text-gray-600">Select a City</p>
      )}
    </div>
  );
}
