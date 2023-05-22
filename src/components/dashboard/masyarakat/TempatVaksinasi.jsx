import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TempatVaksinasi() {
  const [spotVaksinasion, setSpotVaksinasion] = useState([]);
  const [idRegional, setIdRegional] = useState(null);
  const [spots, setSpots] = useState([]);
  const [doctor, setDoctor] = useState([]);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

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
        if (res.data.data.id) {
          setIdRegional(res.data.data.id);
        }else{
          setIdRegional(res.data.spot.id);
        }
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
    if (!token) {
        navigate("/login");
    }

    getProfile();
    getAllDoctor();
    getAllSpots();
  }, []);

  useEffect(() => {
    if (idRegional) {
      getSpecificSpot();
    }
  }, [idRegional]);


  return (
    <>
      <div class="container text-center mt-5 pt-5">
        <h2 className="py-5">List Spot Vaksinasi</h2>
        <div class="row row-cols-3">
          {spotVaksinasion.map((spot) => {
            return (
              <>
                <div class="col">
                  <div class="card">
                    <div class="card-header">{spot.nama}</div>
                    <div class="card-body">
                      <h6 class="card-title">Detail Spot Vaksinasi</h6>
                      <p class="card-text">{spot.alamat}</p>
                      <p>
                        Kapasitas: {spot.kapasitas} dan melayani {spot.melayani}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TempatVaksinasi;
