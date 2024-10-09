import { useState } from "react";

import "./AdminHabit.css";

function AdminHabit({ habitTitle, habitStart, habitEnd, isDone, onClickFunc }) {
  const [status, setStatus] = useState(isDone);
  return (
    <div
      className="admin-habit"
      onClick={async () => {
        try {
          const response = await onClickFunc(habitTitle);
          console.log(response);

          if (response === 200) {
            setStatus(!status);
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <div className="habit-title">
        <div
          className="habit-status"
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: status ? "green" : "red",
            borderRadius: "7px",
          }}
        ></div>
        <h2>{habitTitle}</h2>
      </div>
      <div className="habit-time">
        <p>
          {habitStart} - {habitEnd}
        </p>
      </div>
    </div>
  );
}

export default AdminHabit;
