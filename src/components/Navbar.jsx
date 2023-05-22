import axios from "axios";
import React from "react";

function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogOut = () => {
    axios
      .post("http://localhost:8000/api/v1/auth/logout", {
        token: token,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("token");
          console.log(res);
        }
      });
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/masyarakat">
                  Meminta Konsultasi
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  aria-current="page"
                  href="/masyarakat/tempat/vaksinasi"
                >
                  Tempat Vaksinasi
                </a>
              </li>
              {token ? (
                <form
                  action=""
                  method="post"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogOut();
                  }}
                >
                  <li class="nav-item">
                    <button className="btn btn-sm btn-primary">LogOut</button>
                  </li>
                </form>
              ) : (
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
