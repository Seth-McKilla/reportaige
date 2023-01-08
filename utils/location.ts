import { cities, type CityInfo } from "@/data/cities";

export const locationToAngles = (lat: number, lng: number) => {
  return [
    Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ];
};

export const findCity = (city: string) => {
  return cities.find((c) => c.name === city) as CityInfo;
};
