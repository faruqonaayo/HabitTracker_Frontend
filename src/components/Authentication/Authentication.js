import { useState } from "react";

import axios from "axios";

import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./Authentication.css";

function Authentication({ onAuthenticate, apiUrl }) {
  const [formType, setFormType] = useState("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleFormType() {
    setErrorMessage("");
    setFormType(formType === "login" ? "signup" : "login");
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      if (formType === "login" && email.length > 0 && password.length > 0) {
        const response = await axios.post(`${apiUrl}/auth/login/`, {
          email,
          password,
        });
        // console.log(response.data);
        if (response.data.statusCode === 200) {
          // saving token recieved from server to the app local storage
          localStorage.setItem("dailySync_token", response.data.token);
          onAuthenticate(true);
        }
      } else if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
      } else if (
        formType === "signup" &&
        firstName.length > 1 &&
        lastName.length > 1 &&
        password.length >= 5
      ) {
        const response = await axios.put(`${apiUrl}/auth/signup`, {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        });

        console.log(response.data);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFormType("login");
        setErrorMessage("");
      }
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  }

  return (
    <div className="authentication">
      <Form onSubmitFunction={handleSubmit}>
        {errorMessage !== "" && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}

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
