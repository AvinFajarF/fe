import axios from "axios";
import React, { useEffect, useState } from "react";

function Vaksinasi() {
  const [doctor, setDoctor] = useState([]);

  const [doctorId, setDoctorId] = useState();
  const [date, setDate] = useState();
  const [spots, setSpots] = useState([]);
  const [spotId, setSpotId] = useState();
  const token = localStorage.getItem("token");

  const getAllDoctor = async () => {
    await axios.get("http://localhost:8000/api/v1/doctor").then((res) => {
      setDoctor(res.data.data);
    });
  };

  const getAllSpots = async () => {
    await axios.get("http://localhost:8000/api/v1/spots/all").then((res) => {
      setSpots(res.data.data);
    });
  };

  const getProfile = async () => {
    await axios.get("http://localhost:8000/api/v1/profile", {params:{token:token}}).then(res => {
    console.log(res.data.spot);
    })
  }

  const getAllSpotVaksinasion = async () => {
    await axios.get("http://localhost:8000/api/v1/spots", {params:{token:token}}).then((res) => {
      console.log(res.data.spot);
  })


  }

  useEffect(() => {
    getAllDoctor();
    getAllSpots();
    // getAllSpotVaksinasion();

    getProfile();
  }, []);

  const handleVaksin = async () => {
    await axios
      .post("http://localhost:8000/api/v1/vaksinasi", {
        doctor_id: doctorId,
        date: date,
        token: token,
        spot_id: spotId,
        token: token,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <div class="card mx-auto mt-5" style={{ width: "18rem" }}>
        <div class="card-body">
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              handleVaksin();
            }}
          >
            <div class="mb-3">
              <label for="currentSymptoms" class="form-label">
                Spots
              </label>
              <select
                onChange={(e) => setSpotId(e.target.value)}
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected hidden>
                  Spots
                </option>

                {spots.map((sp) => {
                    return (
                        <>
                        <option value={sp.id}>{sp.name}</option>;
                        </>
                    )
                })}
              </select>
            </div>

            <div class="mb-3">
              <label for="currentSymptoms" class="form-label">
                Doctor
              </label>
              <select
                name="doctor"
                onChange={(e) => setDoctorId(e.target.value)}
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected hidden>
                  Pilih Doctor
                </option>
                {doctor.map((dc) => {
                  return (
                    <>
                      <option value={dc.id}>{dc.name}</option>
                    </>
                  );
                })}
              </select>
            </div>
            <div class="mb-3">
              <label for="diseaseHistory" class="form-label">
                Date
              </label>
              <input
                type="date"
                name="diseaseHistory"
                class="form-control"
                id="diseaseHistory"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <input type="text" value={token} hidden />
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Vaksinasi;
