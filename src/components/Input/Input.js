const defaultStyle = {
  border: "none",
};

function Input({
  addClass,
  inputType,
  inputValue,
  inputPlaceholder,
  onChangeFunction,
}) {
  return (
    <input
      className={`input ${addClass}`}
      style={defaultStyle}
      type={inputType}
      placeholder={inputPlaceholder}
      value={inputValue}
      onChange={(e) => {
        onChangeFunction(e.target.value);
      }}
    />
  );
}

export default Input;
