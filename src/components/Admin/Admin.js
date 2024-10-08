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
  return (
    <div className="admin">
      <div className="admin-header">
        <div className="admin-status">
          <h1>Hello {adminFirstName}</h1>
          <h3>keep the good habit going</h3>
          <h2>
            You have <span>{adminToken}</span> tokens left
          </h2>
        </div>

        <div className="admin-form">
          <Button
            addClass="expand-form-button"
            buttonText={expandHabitForm ? "minimize" : "expand"}
            onClickFunc={handleExpandHabitForm}
          />
          {expandHabitForm && (
            <Form>
              {/* {errorMessage !== "" && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )} */}

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

              <Button buttonText="Add" addClass="submit-button" />
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
