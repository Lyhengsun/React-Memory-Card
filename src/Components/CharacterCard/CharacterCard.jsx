export default CharacterCard;

import { useRef, useState } from "react";
import styles from "./CharacterCard.module.css";
import { useEffect } from "react";
import { capitalize } from "../../Utils";
import { fetchData } from "../../api/api";

function CharacterCard() {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/1/";
  const [pokemonObject, setPokemonObject] = useState(null);
  //const { data, error, loading } = useFetch(apiUrl);
  const imgUrl = pokemonObject?.sprites.front_default ?? "";
  const characterName = pokemonObject?.name ?? "Guest";
  const ignore = useRef(false);

  useEffect(() => {
    if (!ignore.current) {
      fetchData(apiUrl, setPokemonObject);
    }
    return () => {
      ignore.current = true;
    };
  }, []);

  //if (error) {
  //  console.log(error);
  //}

  console.log("rendering");

  return (
    <div className={styles.CharacterCardContainer}>
      <div className={styles.CharacterCardImage}>
        <img
          src={imgUrl}
          alt={characterName + ".png"}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className={styles.CharacterCardName}>
        {capitalize(characterName)}
      </div>
    </div>
  );
}
