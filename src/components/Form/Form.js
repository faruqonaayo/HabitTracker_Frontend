const defaultStyle = {
  border: "none",
};

function Form({ addClass, children, onSubmitFunction }) {
  return (
    <form
      className={`form ${addClass}`}
      style={defaultStyle}
      onSubmit={onSubmitFunction}
    >
      {children}
    </form>
  );
}

export default Form;
