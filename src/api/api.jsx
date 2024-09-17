import { pokemonAmountByGeneration } from "../data/pokemonAmountByGeneration";
import CharacterModel from "../Models/CharacterModel";

const fetchData = (
  url,
  setData,
  {
    signal = null,
    logging = false,
    setCondition = true,
    extraDataFunction = () => {},
  } = {},
) => {
  fetch(url, { signal: signal })
    .then((response) => response.json())
    .then((data) => {
      if (logging) {
        console.log("fetching data");
      }
      extraDataFunction(data);
      if (setCondition) {
        setData(data);
      }
    })
    .catch((error) => {
      console.log("fetchData error");
      console.error(error);
      return null;
    });
};

export const fetchPokemonByGeneration = (
  setData,
  {
    signal = null,
    logging = false,
    generationId = 1,
    setError = () => {},
  } = {},
) => {
  let offset = 0;
  let limit = 151;
  if (generationId > 1) {
    Object.keys(pokemonAmountByGeneration).forEach(function (key) {
      if (key < generationId) {
        offset = offset + pokemonAmountByGeneration[key];
      }
    });
    limit = pokemonAmountByGeneration[generationId];
  }

  const url = new URL(`https://pokeapi.co/api/v2/pokemon/`);
  const params = new URLSearchParams({ offset: offset, limit: limit });
  params.forEach((value, key) => url.searchParams.set(key, value));

  const finalData = [];

  fetch(url, { signal: signal })
    .then((response) => response.json())
    .then((data) => {
      if (logging) {
        console.log(`fetching pokemon data in generation ${generationId}`);
        console.log("url: " + url);
      }
      let dataProgress = 0;
      data.results.forEach((result) => {
        const pokemonUrl = new URL(result.url);
        fetch(pokemonUrl)
          .then((response) => response.json())
          .then((pokemonData) => {
            //console.log(pokemonData);
            finalData.push(
              new CharacterModel(
                pokemonData.id,
                pokemonData.name,
                pokemonData.sprites.front_default,
              ),
            );
            dataProgress++;
            if (dataProgress >= limit) {
              setData(finalData.sort((a, b) => a.id - b.id));
            }
          });
      });
    })
    .catch((error) => {
      console.log("fetch pokemon by generation error");
      setError(error.toString());
      setData(finalData);
    });
};

export function convertToCharacterModel(jsonData) {
  return new CharacterModel();
}

export { fetchData };
