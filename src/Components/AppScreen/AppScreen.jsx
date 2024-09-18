import { useEffect, useMemo, useRef, useState } from "react";
import { fetchPokemonByGeneration } from "../../api/api";
import { PokemonDataProvider } from "../../Contexts/PokemonDataContext";
import PlayScreen from "../PlayScreen/PlayScreen";
import MenuScreen from "../MenuScreen/MenuScreen";
import RetryScreen from "../RetryScreen/RetryScreen";

export default AppScreen;

function AppScreen() {
  const [data, setData] = useState([]);
  const [state, setState] = useState("menuscreen");
  // state = ["playscreen", "menuscreen", "retryscreen"]
  const [includedGen, setIncludedGen] = useState([1]);
  const [dataLoaded, setDataLoaded] = useState([]);
  const ignoreFetch = useRef(false);

  useEffect(() => {
    if (!ignoreFetch.current) {
      setDataLoaded(Array(includedGen.length).fill(false));
      //console.log("try to fetchPokemonByGeneration");
      setData([]);
      ignoreFetch.current = true;
      if (includedGen.length > 0) {
        includedGen.forEach((genId, genIndex) => {
          fetchPokemonByGeneration(
            (data) => {
              setData((d) => [...d, ...data]);
            },
            {
              logging: false,
              generationId: genId,
              setLoaded: () => {
                setDataLoaded((d) =>
                  d.map((v, index) => (index === genIndex ? true : v)),
                );
              },
            },
          );
        });
      }
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
            ignoreFetch={ignoreFetch}
          />
        );
      case "playscreen":
        return <PlayScreen setAppState={setState} />;

      case "retryscreen":
        return <RetryScreen setAppState={setState} />;

      default:
        return <div>Error</div>;
    }
  }, [state, includedGen]);

  //console.log([].every((v) => v !== undefined));

  //console.log(data);

  console.log(dataLoaded);

  return (
    <>
      {dataLoaded.length > 0 && dataLoaded.every((v) => v) ? (
        <PokemonDataProvider initialData={data}>{screen}</PokemonDataProvider>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
