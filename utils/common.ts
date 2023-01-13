export function removeSpecialChars(str: string) {
  return str.replace(/[^a-zA-Z0-9]/g, "");
}

export function toTitleCase(str: string) {
  return str
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function toLowerSpaceCase(str: string) {
  return str
    .replace(/[^a-zA-Z ]/g, "")
    .toLowerCase()
    .replace(" ", "-");
}

export function getRandomArrayItem(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
