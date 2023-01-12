export const removeSpecialChars = (str: string) => {
  return str.replace(/[^a-zA-Z ]/g, "");
};

export const toTitleCase = (str: string) => {
  return str
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

export const toLowerSpaceCase = (str: string) => {
  return str
    .replace(/[^a-zA-Z ]/g, "")
    .toLowerCase()
    .replace(" ", "-");
};

export const getRandomArrayItem = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
