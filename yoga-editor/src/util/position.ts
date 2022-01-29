export const toYogaWorld = (x: number, y: number) => {
  const root = document.getElementById("yoga-root");
  if (!root) throw new Error("yoga-root == null");

  return {
    x: x - root.offsetLeft,
    y: y - root.offsetTop,
  };
};
