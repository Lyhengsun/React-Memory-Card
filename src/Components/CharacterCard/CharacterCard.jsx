export default CharacterCard;

import styles from "./CharacterCard.module.css";
import { capitalize } from "../../Utils";
import PropTypes from "prop-types";
import CharacterModel from "../../Models/CharacterModel";
import { usePokemonDataDispatch } from "../../Contexts/ContextHook";

function CharacterCard({
  pokemonData,
  style = {},
  setScore = () => {},
  onLose = () => {},
}) {
  const name = pokemonData.name;
  const imgUrl = pokemonData.spriteUrl;
  const pokemonDataDispatch = usePokemonDataDispatch();

  const longerScreenWidth = window.innerWidth >= window.innerHeight;

  function handleOnClick() {
    if (!pokemonData.selected) {
      pokemonDataDispatch({
        type: "edited_pokemon_data",
        pokemonId: pokemonData.id,
        pokemonSelected: true,
      });
      setScore((n) => n + 1);
    } else {
      console.log("Wrong!");
      pokemonDataDispatch({
        type: "reseted_pokemon_data_selection",
      });
      onLose();
      setScore(0);
    }
    //console.log(name);
  }

  return (
    <div
      className={styles.CharacterCardContainer}
      onClick={handleOnClick}
      style={{ ...style, padding: longerScreenWidth ? "1vh" : "1vw" }}
    >
      <div
        className={styles.CharacterCardImage}
        style={{ width: longerScreenWidth ? "18vh" : "27vw" }}
      >
        <img
          src={imgUrl}
          alt={name + ".png"}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div
        className={styles.CharacterCardName}
        style={{ fontSize: longerScreenWidth ? "2vh" : "3vw" }}
      >
        {capitalize(name)}
      </div>
    </div>
  );
}
CharacterCard.propTypes = {
  pokemonData: PropTypes.instanceOf(CharacterModel).isRequired,
  style: PropTypes.object,
  setScore: PropTypes.func,
  onLose: PropTypes.func,
};
