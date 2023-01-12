type Artwork = {
  cityId: ObjectId;
  imgFilename: string;
  description: string;
  totalTweets: number;
  hashtags: string[];
  createdAt: Date;
};

type City =
  | "berlin"
  | "cape-town"
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

type CityWithArtwork = CityInfo & {
  artwork: Artwork;
};
