type Artwork = {
  imgSrc: string;
  description: string;
  totalTweets: number;
  hashtags: string[];
  isCurrent?: boolean;
};

type City =
  | "berlin"
  | "johannesburg"
  | "london"
  | "mumbai"
  | "new-york-city"
  | "sao-paulo"
  | "san-francisco"
  | "singapore"
  | "sydney";

type CityInfo = {
  name: City;
  twitterLocationId: number;
  lat: number;
  lng: number;
};
