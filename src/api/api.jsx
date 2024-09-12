import CharacterModel from "../Models/CharacterModel";

const fetchData = async (
  url,
  setData,
  { signal = null, logging = false } = {},
) => {
  await fetch(url, { signal: signal })
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

const generationPokemonAmount = {
  1: 151,
  2: 100,
  3: 135,
  4: 107,
  5: 156,
  6: 72,
  7: 88,
  8: 96,
  9: 120,
};

//export const fetchPokemonById = (setData, url)

export const fetchPokemonByGeneration = async (
  setData,
  { signal = null, logging = false, generationId = 1 } = {},
) => {
  let offset = 0;
  let limit = 151;
  if (generationId > 1) {
    Object.keys(generationPokemonAmount).forEach(function (key) {
      if (key < generationId) {
        offset = offset + generationPokemonAmount[key];
      }
    });
    limit = generationPokemonAmount[generationId];
  }

  const url = new URL(`https://pokeapi.co/api/v2/pokemon/`);
  const params = new URLSearchParams({ offset: offset, limit: limit });
  params.forEach((value, key) => url.searchParams.set(key, value));

  fetch(url, { signal: signal })
    .then((response) => response.json())
    .then(async (data) => {
      if (logging) {
        console.log("fetching pokemon data by generation");
        console.log("url: " + url);
      }
      const convertedData = [];
      await data.results.forEach((result) => {
        const pokemonUrl = new URL(result.url);
        fetch(pokemonUrl)
          .then((response) => response.json())
          .then((pokemonData) => {
            //console.log(pokemonData);
            convertedData.push(
              new CharacterModel(
                pokemonData.id,
                pokemonData.sprites.front_default,
              ),
            );
          });
      });

      setData(convertedData);
    });
};

export function convertToCharacterModel(jsonData) {
  return new CharacterModel();
}

export { fetchData };
