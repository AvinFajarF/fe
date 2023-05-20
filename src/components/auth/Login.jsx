import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const parsedUsername = parseInt(username);

  

  const handleLogin = async () => {
    await axios
      .post(
        `http://127.0.0.1:8000/api/v1/auth/login`,
        {
          id_card_number: parsedUsername,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((e) => {
        if (e.data.role === 'doctor' && e.status === 200) {
            navigate('/doctor');
          localStorage.setItem("token", e.data.token);
        }else{
          localStorage.setItem("token", e.data.token);
         navigate('/masyarakat');
        }
      })
      .catch((e) => console.log(e));
  };


  return (
    <>
      <div class="card mx-auto mt-5" style={{ width: "18rem" }}>
        <div class="card-body">
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div class="mb-3">
              <label for="username" class="form-label">
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                class="form-control"
                id="username"
                aria-describedby="username"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
