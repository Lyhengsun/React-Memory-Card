import CharacterModel from "../Models/CharacterModel";

const fetchData = (url, setData, { signal = null, logging = false } = {}) => {
  fetch(url, { signal: signal ? signal : null })
    .then((response) => response.json())
    .then((data) => {
      if (logging) {
        console.log("fetching data");
      }
      setData(data);
    })
    .catch((error) => {
      console.log("fetchData error");
      console.error(error);
      return null;
    });
};

export function convertToCharacterModel(jsonData) {
  return new CharacterModel();
}

export { fetchData };
