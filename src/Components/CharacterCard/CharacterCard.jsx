export default CharacterCard;

import styles from "./CharacterCard.module.css";
import { capitalize } from "../../Utils";
import PropTypes from "prop-types";
import CharacterModel from "../../Models/CharacterModel";
import { usePokemonDataDispatch } from "../../Contexts/ContextHook";

function CharacterCard({ pokemonData, setSelectedIds = () => {} }) {
  const name = pokemonData.name;
  const imgUrl = pokemonData.spriteUrl;
  const pokemonDataDispatch = usePokemonDataDispatch();

  //console.log("rendering");

  function handleOnClick() {
    if (!pokemonData.selected) {
      pokemonDataDispatch({
        type: "edited_pokemon_data",
        pokemonId: pokemonData.id,
        pokemonSelected: true,
      });
      setSelectedIds((a) => [...a, pokemonData.id]);
    }
    console.log(name);
  }

  return (
    <div className={styles.CharacterCardContainer} onClick={handleOnClick}>
      <div className={styles.CharacterCardImage}>
        <img
          src={imgUrl}
          alt={name + ".png"}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className={styles.CharacterCardName}>{capitalize(name)}</div>
    </div>
  );
}
CharacterCard.propTypes = {
  pokemonData: PropTypes.instanceOf(CharacterModel).isRequired,
  setSelectedIds: PropTypes.instanceOf(Function),
};
