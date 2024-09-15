import PropTypes from "prop-types";

export default MenuScreen;

function MenuScreen({ setAppState = () => {}, ignoreFetch = [] }) {
  function handleOnPlayClick() {
    setAppState("playscreen");
    ignoreFetch[0] = false;
    console.log(ignoreFetch);
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
  ignoreFetch: PropTypes.array,
};
