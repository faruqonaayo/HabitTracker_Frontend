const defaultStyle = {
    border: "none",
    cursor: "pointer",
};

function Button({ buttonText, addClass }) {
  return (
    <button className={`button ${addClass}`} style={defaultStyle}>
      {buttonText}
    </button>
  );
}

export default Button;
