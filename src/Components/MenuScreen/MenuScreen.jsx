import PropTypes from "prop-types";
import { availableGeneration } from "../../data/availableGeneration";

export default MenuScreen;

function MenuScreen({
  setAppState = () => {},
  includedGen,
  setIncludedGen = () => {},
}) {
  function handleOnPlayClick() {
    setAppState("playscreen");
  }

  function handleOnChangeGenDropDownSave(e, genId = null) {
    const newId = parseInt(e.target.value, 10);

    if (genId) {
      const filteredIncludedGen = includedGen.filter(
        (includedGenId) => includedGenId !== genId,
      );
      const newIncludedGen = [...filteredIncludedGen, newId];
      setIncludedGen(newIncludedGen);
    } else {
      setIncludedGen((g) => [...g, newId]);
    }
  }

  function handleOnChangeGenDropDownDelete(genId = null) {
    if (genId) {
      console.log(
        "includedGenId.indexOf(genId) = " + includedGen.indexOf(genId),
      );
      setIncludedGen(includedGen.filter((gId) => gId !== genId));
    }
  }

  //console.log("includedGen");
  //console.log(includedGen);

  return (
    <div>
      <div
        style={{ fontWeight: "bold", fontSize: "2em", marginBottom: "10px" }}
      >
        Pokemon Memory Game
      </div>
      {includedGen.map((genId, index) => {
        const options = availableGeneration.filter(
          (genId) => !includedGen.includes(genId),
        );
        return (
          <GenerationDropDown
            key={genId}
            selectedGen={genId}
            genOptions={[genId, ...options]}
            showChoose={index !== 0}
            onSave={(e) => handleOnChangeGenDropDownSave(e, genId)}
            onDelete={() => handleOnChangeGenDropDownDelete(genId)}
          />
        );
      })}
      {includedGen.length < 9 && (
        <GenerationDropDown
          genOptions={availableGeneration.filter(
            (genId) => !includedGen.includes(genId),
          )}
          onSave={handleOnChangeGenDropDownSave}
        />
      )}
      <button onClick={handleOnPlayClick} disabled={!(includedGen.length > 0)}>
        Play
      </button>
    </div>
  );
}
MenuScreen.propTypes = {
  setAppState: PropTypes.func,
  includedGen: PropTypes.array.isRequired,
  setIncludedGen: PropTypes.func,
};

function GenerationDropDown({
  selectedGen = null,
  genOptions,
  showChoose = true,
  onSave = () => {},
  onDelete = () => {},
}) {
  const defaultValue = selectedGen ? selectedGen : 0;
  function handleOnChange(e) {
    const value = parseInt(e.target.value, 10);
    if (value !== 0) {
      onSave(e);
    } else {
      onDelete(e);
    }
  }
  return (
    <div>
      <select
        name=""
        id=""
        defaultValue={defaultValue}
        onChange={handleOnChange}
      >
        <option value="0" disabled={!showChoose}>
          Choose your generation
        </option>
        {genOptions.map((item) => {
          if (item === selectedGen) {
            return (
              <option key={item} value={item}>
                Generation {item}
              </option>
            );
          }
          return (
            <option key={item} value={item}>
              Generation {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}
GenerationDropDown.propTypes = {
  selectedGen: PropTypes.number,
  genOptions: PropTypes.array.isRequired,
  showChoose: PropTypes.bool,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
};
