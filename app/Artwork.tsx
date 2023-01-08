import type { City } from "@/data/cities";

type Props = {
  selectedCity: City | null;
};

export default function Artwork({ selectedCity }: Props) {
  return (
    <div className="flex items-center justify-center text-center border-4 border-gray-500 border-dashed rounded-lg w-[900px] h-[600px]">
      <p className="text-xl font-semibold text-gray-600">artwork placeholder</p>
    </div>
  );
}
