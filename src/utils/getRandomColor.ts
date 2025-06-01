const PALETTE = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];

const getRandomColor = (userName: string): string => {
  let hash = 0;
  for (let i = 0; i < userName.length; i++) {
    hash = hash + userName.charCodeAt(i);
  }
  const index = hash % PALETTE.length;
  return PALETTE[index];
};

export default getRandomColor;
