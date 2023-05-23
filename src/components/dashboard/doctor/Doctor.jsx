import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Doctor() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);


  const getConsultasion = async () => {
    await axios
      .get("http://localhost:8000/api/v1/consultation", {
        params: {
          token: token,
        },
      })
      .then((e) => setData(e.data.konsultasi));
  };

  useEffect(() => {
    getConsultasion();

    // if (token === undefined || token === null || !token) {
    //   navigate("/login")
    // }
  }, []);

  const handleStatus = async (id) => {
    console.log(id);
    await axios
      .put(`http://localhost:8000/api/v1/consultation/${id}/update`, { status: status,token: token })
      .then((e) => {
        console.log(e);
    getConsultasion();
      });
  };

  return (
    <>
      <div className="header">
        <h1>Dashboard Doctor</h1>
      </div>

      <div className="container">
        <h3 className="py-5">List Consultasion</h3>

        <div class="row row-cols-3">
          {data.map((data) => {
            return (
              <div class="col">
                <div class="card" style={{ width: "18rem" }}>
                  <div class="card-body">
                    <h5 class="card-title">Consultasion</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                      User: {data.user}
                    </h6>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item d-flex ">
                        Status{" "}
                        <span
                          style={{ display: "inline-block" }}
                          className={`ms-auto badge ${data.status === "accepted" ? "text-bg-success" : "text-bg-warning"} ${data.status === "rejected" ? "text-bg-danger" : ""}`}
                        >
                          {data.status}
                        </span>
                      </li>
                      <li class="list-group-item d-flex">
                        Disase History{" "}
                        <span
                          style={{ display: "inline-block" }}
                          className="ms-auto"
                        >
                          {data.disease_history}
                        </span>
                      </li>
                      <li class="list-group-item d-flex">
                        Current
                        <span
                          style={{ display: "inline-block" }}
                          className="ms-auto"
                        >
                          {data.current_symptoms}
                        </span>
                      </li>
                      <li class="list-group-item d-flex">
                        Doctor Name{" "}
                        <span
                          style={{ display: "inline-block" }}
                          className="ms-auto"
                        ></span>
                      </li>
                      <li class="list-group-item d-flex">
                        Doctor Notes{" "}
                        <span
                          style={{ display: "inline-block" }}
                          className="ms-auto"
                        >
                          {data.doctor_notes}
                        </span>
                      </li>
                      <li class="list-group-item d-flex">
                        <form
                          method="post"
                          onSubmit={(event) => {
                            event.preventDefault();
                            handleStatus(data.id);
                          }}
                        >
                          <button
                            type="submit"
                            className="btn btn-success"
                            onClick={(e) => setStatus(e.target.value)}
                            value={"accepted"}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger ms-3"
                            onClick={(e) => setStatus(e.target.value)}
                            value={"rejected"}
                          >
                            Reject
                          </button>
                        </form>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default Doctor;
