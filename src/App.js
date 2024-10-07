import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Authentication from "./components/Authentication/Authentication";

const apiUrl = "https://habittracker-backend-vmpc.onrender.com";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function loginWithToken(params) {
      try {
        const response = await axios.post(
          `${apiUrl}/auth/login/`,
          {},
          {
            headers: {
              Authorization: `Bearer=${localStorage.getItem(
                "dailySync_token"
              )}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.statusCode === 200) {
          document.cookie = `token=${response.data.token}`;
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loginWithToken();
  }, []);

  return (
    <div className="App">
      {isAuthenticated ? (
        <h1>Logged In</h1>
      ) : (
        <Authentication onAuthenticate={setIsAuthenticated} apiUrl={apiUrl} />
      )}
    </div>
  );
}

export default App;
