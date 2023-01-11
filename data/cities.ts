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
