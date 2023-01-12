export function locationToAngles(lat: number, lng: number) {
  return [
    Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ];
}

export function findCity(cityName: City, citiesWithArtwork: CityWithArtwork[]) {
  return citiesWithArtwork.find(
    (city) => city.name === cityName
  ) as CityWithArtwork;
}
