import { useEffect, useMemo, useRef, useState } from "react";
import { fetchPokemonByGeneration } from "../../api/api";
import { PokemonDataProvider } from "../../Contexts/PokemonDataContext";
import PlayScreen from "../PlayScreen/PlayScreen";
import MenuScreen from "../MenuScreen/MenuScreen";

export default AppScreen;

function AppScreen() {
  const [data, setData] = useState([]);
  const [state, setState] = useState("menuscreen");
  const [includedGen, setIncludedGen] = useState([1]);
  // state = ["playscreen", "menuscreen"]
  const ignoreFetch = useRef(false);

  useEffect(() => {
    console.log("ignoreFetch.current = " + ignoreFetch.current);
    if (!ignoreFetch.current) {
      console.log("try to fetchPokemonByGeneration");
      setData([]);
      ignoreFetch.current = true;
      if (includedGen.length > 0) {
        includedGen.forEach((genId) => {
          fetchPokemonByGeneration(
            (data) => {
              setData((d) => [...d, ...data]);
            },
            {
              logging: true,
              generationId: genId,
            },
          );
        });
      }
    }
    return () => {};
  }, [includedGen]);

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

      default:
        return <div>Error</div>;
    }
  }, [state, includedGen]);

  console.log(data);

  return (
    <>
      {data.length > 0 ? (
        <PokemonDataProvider initialData={data}>{screen}</PokemonDataProvider>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
