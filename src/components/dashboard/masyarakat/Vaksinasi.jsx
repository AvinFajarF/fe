import axios from "axios";
import React, { useEffect, useState } from "react";

function Vaksinasi() {
  const [doctor, setDoctor] = useState([]);

  const [doctorId, setDoctorId] = useState();
  const [date, setDate] = useState();
  const [spots, setSpots] = useState([]);
  const [spotId, setSpotId] = useState();

  // get specific spot in masyarakat
  const [spotVaksinasion, setSpotVaksinasion] = useState([]);
  const [idRegional, setIdRegional] = useState(null);

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
    await axios
      .get("http://localhost:8000/api/v1/profile", { params: { token: token } })
      .then((res) => {
        console.log(res.data.data);
        setIdRegional(res.data.spot.id);
      });
  };

  const getSpecificSpot = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/spots/${idRegional}`, {
        params: { token: token },
      })
      .then((res) => {
        setSpotVaksinasion(res.data.spot);
      });
  };

  useEffect(() => {
    getProfile();
    getAllDoctor();
    getAllSpots();
  }, []);

  useEffect(() => {
    if (idRegional) {
      getSpecificSpot();
    }
  }, [idRegional]);

  const handleVaksin = async () => {
    await axios
      .post("http://localhost:8000/api/v1/vaksinasi", {
        doctor_id: doctorId,
        date: date,
        spot_id: spotId,
        token: token,
      })
      .then((response) => {
        // console.log(response);
      });
  };

  return (
    <>
      <div className="card mx-auto mt-5" style={{ width: "18rem" }}>
        <div className="card-body">
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              handleVaksin();
            }}
          >
            <div className="mb-3">
              <label for="currentSymptoms" className="form-label">
                Spots
              </label>
              <select
                onChange={(e) => setSpotId(e.target.value)}
                className="form-select form-select-sm"
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
                  );
                })}
              </select>
            </div>

            <div className="mb-3">
              <label for="currentSymptoms" className="form-label">
                Doctor
              </label>
              <select
                name="doctor"
                onChange={(e) => setDoctorId(e.target.value)}
                className="form-select form-select-sm"
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
            <div className="mb-3">
              <label for="diseaseHistory" className="form-label">
                Date
              </label>
              <input
                type="date"
                name="diseaseHistory"
                className="form-control"
                id="diseaseHistory"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <input type="text" value={token} hidden />
            <button type="submit" className="btn btn-primary btn-sm">
              Submit
            </button>
            <a href="/masyarakat/tempat/vaksinasi" className="btn btn-sm btn-primary ms-2">Tempat Vaksinasi</a>
          </form>
        </div>
      </div>
    </>
  );
}

export default Vaksinasi;
