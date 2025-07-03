const PALETTE = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];

const getRandomColor = (text: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = hash + text.charCodeAt(i);
  }
  const index = hash % PALETTE.length;
  return PALETTE[index];
};

export default getRandomColor;
