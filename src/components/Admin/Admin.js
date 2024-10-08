import { useEffect, useState } from "react";

import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import LabelInput from "../LabelInput/LabelInput";
import "./Admin.css";
import axios from "axios";

function Admin({ apiUrl, onAuthenticate }) {
  const [habitTitle, setHabitTitle] = useState("");
  const [habitStart, setHabitStart] = useState("");
  const [habitEnd, setHabitEnd] = useState("");
  const [expandHabitForm, setExpandHabitForm] = useState(false);
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function getAdminInfo() {
      try {
        const response = await axios.get(`${apiUrl}/admin/adminInfo`, {
          headers: {
            Authorization: `Bearer=${localStorage.getItem("dailySync_token")}`,
          },
        });

        console.log(response.data.info);
        setAdminFirstName(response.data.info.firstName);
        setAdminToken(response.data.info.habitTokens);
      } catch (error) {
        onAuthenticate(false);
      }
    }
    getAdminInfo();
  });

  function handleExpandHabitForm() {
    setExpandHabitForm(!expandHabitForm);
  }

  async function handleSubmitHabit(e) {
    try {
      e.preventDefault();
      if (
        habitTitle.length > 2 &&
        habitStart.length === 5 &&
        habitEnd.length === 5
      ) {
        const response = await axios.put(
          `${apiUrl}/admin/habit`,
          {
            title: habitTitle.toLowerCase(),
            start: habitStart,
            end: habitEnd,
          },
          {
            headers: {
              Authorization: `Bearer=${localStorage.getItem(
                "dailySync_token"
              )}`,
            },
          }
        );
        console.log(response.data);
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        setHabitTitle("");
        setHabitStart("");
        setHabitEnd("");
      }
      else {
        setErrorMessage("Enter valid habit details");
        setSuccessMessage("");
      }
    } catch (error) {
      // console.log(error);
      if (error.response.data.statusCode === 401) {
        onAuthenticate(false);
      }
      setErrorMessage(error.response.data.message);
      setSuccessMessage("");
    }
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <div className="admin-status">
          <h1>DailySync Web App</h1>
          <h2>Hello {adminFirstName}</h2>
          <p>keep the good habit going</p>
          <h3>
            You have <span>{adminToken}</span> tokens left
          </h3>
        </div>

        <div className="admin-form">
          <Button
            addClass="expand-form-button"
            buttonText={expandHabitForm ? "minimize" : "expand"}
            onClickFunc={handleExpandHabitForm}
          />
          {expandHabitForm && (
            <Form onSubmitFunction={handleSubmitHabit}>
              {errorMessage !== "" && (
                <div className="error-message">
                  <p>{errorMessage}</p>
                </div>
              )}
              {successMessage !== "" && (
                <div className="success-message">
                  <p>{successMessage}</p>
                </div>
              )}

              <LabelInput labelText="Title:">
                <Input
                  inputType="text"
                  inputPlaceholder="Enter habit title"
                  inputValue={habitTitle}
                  onChangeFunction={setHabitTitle}
                />
              </LabelInput>
              <LabelInput labelText="Start Time:">
                <Input
                  inputType="time"
                  inputPlaceholder="Enter start time"
                  inputValue={habitStart}
                  onChangeFunction={setHabitStart}
                />
              </LabelInput>
              <LabelInput labelText="End Time:">
                <Input
                  inputType="time"
                  inputPlaceholder="Enter end time"
                  inputValue={habitEnd}
                  onChangeFunction={setHabitEnd}
                />
              </LabelInput>

              <Button
                buttonText="Add for 10000 tokens"
                addClass="submit-button"
              />
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
