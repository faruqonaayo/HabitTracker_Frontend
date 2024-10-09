import { useEffect, useState } from "react";

import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import LabelInput from "../LabelInput/LabelInput";
import AdminHabit from "./AdminHabit/AdminHabit";
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
  const [adminHabits, setAdminHabits] = useState([]);

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
        if (error.response.data.statusCode === 401) {
          onAuthenticate(false);
        }
      }
    }
    getAdminInfo();
  });

  useEffect(() => {
    async function getAdminHabits() {
      try {
        const response = await axios.get(`${apiUrl}/admin/allHabits`, {
          headers: {
            Authorization: `Bearer=${localStorage.getItem("dailySync_token")}`,
          },
        });
        console.log(response.data);
        setAdminHabits((c) => response.data.habits);
        // return
      } catch (error) {
        onAuthenticate(false);
      }
    }
    getAdminHabits();
  }, [adminToken]);

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
      } else {
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

  async function handleHabitClick(title) {
    try {
      const response = await axios.post(
        `${apiUrl}/admin/checkHabit`,
        {
          title: title,
        },
        {
          headers: {
            Authorization: `Bearer=${localStorage.getItem("dailySync_token")}`,
          },
        }
      );
      console.log(response.data);
      setAdminToken("...");
      return response.data.statusCode;
    } catch (error) {
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

      <div className="admin-habits-container">
        <h1>Check What you have done Today</h1>
        {adminHabits.map((habit, index) => (
          <AdminHabit
            key={index}
            habitTitle={habit.title}
            habitStart={habit.startTime}
            habitEnd={habit.endTime}
            isDone={habit.isCompleted}
            onClickFunc={handleHabitClick}
          />
        ))}
        {/* <AdminHabit habitTitle="Exercise" habitStart="6:00" habitEnd="7:00" /> */}
      </div>
    </div>
  );
}

export default Admin;
