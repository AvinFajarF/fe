import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [errorResponse, seterrorResponse] = useState();

  const navigate = useNavigate();
  const parsedUsername = parseInt(username);

  const handleClick = () => {
    setIsLoading(true);
  }

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

        setResponse(e.status);

        console.log(e.data.boddy.role);
        if (e.data ) {
          if (e.data.boddy.role === "doctor" && e.status === 200) {
            localStorage.setItem("token", e.data.token);
            navigate("/doctor");
            } else {
              localStorage.setItem("token", e.data.boddy.token);
              navigate("/masyarakat");
            };
            }
      })
      .catch((e) => seterrorResponse(e.response.data.message));
  };

  return (
    <>
      {response === 200 ? (
        <div
          class="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Anda berhasil login</strong> bla bla bla.
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        ""
      )}

{errorResponse ?  (
  <div className="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Anda gagal login</strong> bla bla bla.
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
) : (
  ""
)}


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
            <button type="submit" class={`btn btn-primary ${isLoading ? 'disabled' : ""}`} onClick={handleClick}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
