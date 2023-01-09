export type City =
  | "berlin"
  | "johannesburg"
  | "london"
  | "mumbai"
  | "new-york-city"
  | "sao-paulo"
  | "san-francisco"
  | "singapore"
  | "sydney";

export type CityInfo = {
  name: City;
  id: number;
  lat: number;
  lng: number;
};

export const cities: CityInfo[] = [
  {
    name: "berlin",
    id: 638242,
    lat: 52.520008,
    lng: 13.404954,
  },
  {
    name: "johannesburg",
    id: 2295412,
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
    name: "mumbai",
    id: 2295411,
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
    name: "singapore",
    id: 23424948,
    lat: 1.352083,
    lng: 103.819836,
  },
  {
    name: "sydney",
    id: 1105779,
    lat: -33.86882,
    lng: 151.20929,
  },
];
