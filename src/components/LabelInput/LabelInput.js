function LabelInput({ labelText, children }) {
  return (
    <div className="label-input">
      <label>{labelText}</label>
      {children}
    </div>
  );
}

export default LabelInput;