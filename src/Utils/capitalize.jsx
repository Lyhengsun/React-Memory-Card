export default function capitalize(text = "") {
  const splitTexts = text.split(" ");
  splitTexts.forEach((t, index) => {
    splitTexts[index] = t.charAt(0).toUpperCase() + t.slice(1);
  });

  const splitTexts2 = splitTexts.join(" ").split("-");
  splitTexts2.forEach((t, index) => {
    splitTexts2[index] = t.charAt(0).toUpperCase() + t.slice(1);
  });

  const result = splitTexts2.join("-");
  return result;
}
