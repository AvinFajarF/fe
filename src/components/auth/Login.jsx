import axios from "axios";
import React, { useEffect, useState } from "react";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState("");

  // const url = "http://localhost:8080/api/v1/";

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/v1/konsultasi",{
    withCredentials: true,
    
    }).then((response) => {

console.log(response.json());
    }).catch(err => console.log(err))



  })

  const handleLogin = async () => {
    await axios
      .post(`http://127.0.0.1:8080/api/v1/auth/login`, {
        username: username,
        password: password,
      },{
        withCredentials: true
      })
      .then((e) => {
        console.log(e);
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
