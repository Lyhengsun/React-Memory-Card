import { useEffect, useMemo, useRef, useState } from "react";
import { fetchPokemonByGeneration } from "../../api/api";
import { PokemonDataProvider } from "../../Contexts/PokemonDataContext";
import PlayScreen from "../PlayScreen/PlayScreen";
import MenuScreen from "../MenuScreen/MenuScreen";
import RetryScreen from "../RetryScreen/RetryScreen";
import { availableGeneration } from "../../data/availableGeneration";

export default AppScreen;

function AppScreen() {
  const [data, setData] = useState([]);
  const [state, setState] = useState("menuscreen");
  const [includedGen, setIncludedGen] = useState([1]);
  const [dataLoaded, setDataLoaded] = useState([]);
  // state = ["playscreen", "menuscreen", "retryscreen"]
  const ignoreFetch = useRef(false);

  const loadingPercentage =
    (dataLoaded.filter((v) => v).length * 100) / dataLoaded.length;

  useEffect(() => {
    if (!ignoreFetch.current) {
      console.log("try to fetchPokemonByGeneration");
      setDataLoaded([]);
      const newDataLoaded = Array(availableGeneration.length).fill(false);
      setData([]);
      ignoreFetch.current = true;
      availableGeneration.forEach((genId, genIndex) => {
        fetchPokemonByGeneration(
          (data) => {
            setData((d) => [...d, { gen: genId, pokemons: [...data] }]);
          },
          {
            logging: false,
            generationId: genId,
            setLoaded: () => {
              newDataLoaded[genIndex] = true;
              setDataLoaded(newDataLoaded);
            },
          },
        );
      });
    }
    return () => {};
  }, [includedGen, dataLoaded]);

  const screen = useMemo(() => {
    switch (state) {
      case "menuscreen":
        return (
          <MenuScreen
            setAppState={setState}
            includedGen={includedGen}
            setIncludedGen={setIncludedGen}
          />
        );
      case "playscreen":
        return <PlayScreen setAppState={setState} includedGen={includedGen} />;

      case "retryscreen":
        return <RetryScreen setAppState={setState} />;

      default:
        return <div>Error</div>;
    }
  }, [state, includedGen]);

  //console.log([].every((v) => v !== undefined));
  //console.log("dataLoaded");
  //console.log(dataLoaded);
  //console.log(data);

  return (
    <>
      {dataLoaded.length > 0 && dataLoaded.every((v) => v === true) ? (
        <PokemonDataProvider initialData={data}>{screen}</PokemonDataProvider>
      ) : (
        <div>
          Fetching 9 generations of Pokemon Data{" "}
          {loadingPercentage ? Math.round(loadingPercentage) : 0}%
        </div>
      )}
    </>
  );
}
