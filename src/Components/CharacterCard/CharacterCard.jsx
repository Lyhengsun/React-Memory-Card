export default CharacterCard;

import { useState } from "react";
import styles from "./CharacterCard.module.css";
import { useEffect } from "react";
import { capitalize } from "../../Utils";

function CharacterCard() {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/1/";
  const [pokemonObject, setPokemonObject] = useState(null);
  const imgUrl = pokemonObject?.sprites.front_default ?? "";
  const characterName = pokemonObject?.name ?? "Guest";

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setPokemonObject(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
