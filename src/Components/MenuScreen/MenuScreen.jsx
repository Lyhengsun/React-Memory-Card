import PropTypes from "prop-types";

export default MenuScreen;

function MenuScreen({ setAppState = () => {} }) {
  function handleOnPlayClick() {
    setAppState("playscreen");
  }

  return (
    <div>
      <div>MenuScreen</div>
      <button onClick={handleOnPlayClick}>Play</button>
    </div>
  );
}
MenuScreen.propTypes = {
  setAppState: PropTypes.func,
};
