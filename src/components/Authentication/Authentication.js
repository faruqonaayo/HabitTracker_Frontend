import { useState } from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./Authentication.css";

function Authentication({}) {
  const [formType, setFormType] = useState("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleFormType() {
    setFormType(formType === "login" ? "signup" : "login");
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");
  }
  return (
    <div className="authentication">
      <Form onSubmitFunction={handleSubmit}>
        {formType === "signup" && (
          <>
            <LabelInput labelText="First Name:">
              <Input
                inputType="text"
                inputPlaceholder="Enter your first name"
                inputValue={firstName}
                onChangeFunction={setFirstName}
              />
            </LabelInput>
            <LabelInput labelText="Last Name:">
              <Input
                inputType="text"
                inputPlaceholder="Enter your last name"
                inputValue={lastName}
                onChangeFunction={setLastName}
              />
            </LabelInput>
          </>
        )}
        <LabelInput labelText="Email:">
          <Input
            inputType="email"
            inputPlaceholder="Enter your email"
            inputValue={email}
            onChangeFunction={setEmail}
          />
        </LabelInput>
        <LabelInput labelText="Password:">
          <Input
            inputType="password"
            inputPlaceholder="Enter your password"
            inputValue={password}
            onChangeFunction={setPassword}
          />
        </LabelInput>
        {formType === "signup" && (
          <>
            <LabelInput labelText="Confirm Password:">
              <Input
                inputType="password"
                inputPlaceholder="Confirm your password"
                inputValue={confirmPassword}
                onChangeFunction={setConfirmPassword}
              />
            </LabelInput>
          </>
        )}
        <div className="switch-auth">
          <p onClick={handleFormType} style={{ cursor: "pointer" }}>
            {formType === "login" ? "Become a member" : "Already a member"}
          </p>
        </div>

        <Button buttonText="Sign up" addClass="submit-button" />
      </Form>
    </div>
  );
}

export default Authentication;

function LabelInput({ labelText, children }) {
  return (
    <div className="label-input">
      <label>{labelText}</label>
      {children}
    </div>
  );
}
