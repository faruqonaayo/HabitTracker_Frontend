const defaultStyle = {
    border: "none",
    cursor: "pointer",
};

function Button({ buttonText, addClass, onClickFunc }) {
  return (
    <button className={`button ${addClass}`} style={defaultStyle} onClick={onClickFunc}>
      {buttonText}
    </button>
  );
}

export default Button;
