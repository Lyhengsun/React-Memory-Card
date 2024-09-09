export default function capitalize(text = "") {
  const splitTexts = text.split(" ");
  splitTexts.forEach((t, index) => {
    splitTexts[index] = t.charAt(0).toUpperCase() + t.slice(1);
  });
  return splitTexts.join(" ");
}
