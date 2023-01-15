import Image from "next/image";

type Props = {
  cityWithArtwork: CityWithArtwork | null;
};

export default function Artwork({ cityWithArtwork }: Props) {
  let containerStyles = `relative flex items-center justify-center h-[385px] w-[385px] sm:h-[512px] sm:w-[512px] ${
    !cityWithArtwork && "border-4 border-gray-500 border-dashed"
  }`;

  return (
    <div className={containerStyles}>
      {cityWithArtwork ? (
        <Image
          src={cityWithArtwork.artwork.imgFilename}
          alt={`AI generated artwork for ${cityWithArtwork.name}`}
          fill
          sizes="(max-width: 640px) 385px, 512px"
          style={{
            objectFit: "contain",
          }}
        />
      ) : (
        <p className="text-xl font-semibold text-gray-600">Select a City</p>
      )}
    </div>
  );
}
