export type City =
  | "berlin"
  | "johannesburg"
  | "london"
  | "moscow"
  | "mumbai"
  | "new-york-city"
  | "sao-paulo"
  | "san-francisco"
  | "shanghai"
  | "singapore"
  | "sydney"
  | "tokyo";

export type CityInfo = {
  name: City;
  id: number;
  lat: number;
  lng: number;
};

export const cities = [
  {
    name: "berlin",
    id: 638242,
    lat: 52.520008,
    lng: 13.404954,
  },
  {
    name: "johannesburg",
    id: 993800,
    lat: -26.204103,
    lng: 28.047305,
  },
  {
    name: "london",
    id: 44418,
    lat: 51.507351,
    lng: -0.127758,
  },
  {
    name: "moscow",
    id: 2122265,
    lat: 55.755826,
    lng: 37.6173,
  },
  {
    name: "mumbai",
    id: 2147714,
    lat: 19.075984,
    lng: 72.877656,
  },
  {
    name: "new-york-city",
    id: 2459115,
    lat: 40.712775,
    lng: -74.005973,
  },
  {
    name: "sao-paulo",
    id: 455819,
    lat: -23.55052,
    lng: -46.633309,
  },
  {
    name: "san-francisco",
    id: 2487956,
    lat: 37.77493,
    lng: -122.419416,
  },
  {
    name: "shanghai",
    id: 2151849,
    lat: 31.230416,
    lng: 121.473701,
  },
  {
    name: "singapore",
    id: 1062617,
    lat: 1.352083,
    lng: 103.819836,
  },
  {
    name: "sydney",
    id: 1105779,
    lat: -33.86882,
    lng: 151.20929,
  },
  {
    name: "tokyo",
    id: 1118370,
    lat: 35.689487,
    lng: 139.691706,
  },
] as CityInfo[];
