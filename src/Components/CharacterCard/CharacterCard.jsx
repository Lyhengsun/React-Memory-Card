export default CharacterCard;

import { useRef, useState } from "react";
import styles from "./CharacterCard.module.css";
import { capitalize } from "../../Utils";
import PropTypes from "prop-types";
import CharacterModel from "../../Models/CharacterModel";

function CharacterCard({ pokemonData }) {
  const name = pokemonData.name;
  const imgUrl = pokemonData.spriteUrl;

  //console.log("rendering");

  return (
    <div className={styles.CharacterCardContainer}>
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
};
