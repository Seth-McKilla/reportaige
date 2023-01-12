import Image from "next/image";

type Props = {
  cityWithArtwork: CityWithArtwork | null;
};

export default function Artwork({ cityWithArtwork }: Props) {
  let containerStyles =
    "flex items-center justify-center text-center rounded-lg w-full h-full sm:w-[512px] sm:h-[512px]";
  let borderStyles = " border-4 border-gray-500 border-dashed";
  if (!cityWithArtwork) containerStyles += borderStyles;

  return (
    <div className={containerStyles}>
      {cityWithArtwork ? (
        <Image
          src={cityWithArtwork.artwork.imgFilename}
          alt={cityWithArtwork.artwork.description || "Artwork"}
          width={512}
          height={512}
        />
      ) : (
        <p className="text-xl font-semibold text-gray-600">Select a City</p>
      )}
    </div>
  );
}
