import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DetailTempat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //   usestate
  const [dateInput, setdateInput] = useState();
  const [dateData, setDateData] = useState();
  const [countVaksinasi, setCountVaksinasi] = useState();
  const [counter, setCounter] = useState([]);
  const [dataVaksinasi, setDataVaksinasi] = useState(null);

  //   date
  const date = new Date();
  const Year = date.getFullYear();
  const Month = date.getMonth();
  const Day = date.getDate();
  const dates = `${Year}-${Month}-${Day}`;

  const getSpecificSpot = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/vaksinasi/${id}/${dateInput}`, {
        params: { token: token },
      })
      .then((res) => {
        console.log(res.data);
        setDataVaksinasi(res.data.data);
      });
  };

  const getVaksinasiCount = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/vaksinasi/${id}/${dateInput}/count`, {
        params: { token: token },
      })
      .then((res) => {
        setCountVaksinasi(res.data);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    getSpecificSpot();
    getVaksinasiCount();

    //         data.map(e => {
    //             console.log(e);
    //          const total = e.spots.capacity / 3;

    //          let x = 1;
    //          for (let y = 0; y < 3; y++) {

    //             const datas = []
    //             for (let z = 0; z < total; z++) {
    //              datas.push(x)

    //             }

    // console.log(datas);
    //          }

    //         })
  }, [dateInput]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    if (dataVaksinasi) {
      const count = [];
      const total = dataVaksinasi.spots.capacity / 3;

      for (let i = 0; i < 3; i++) {
        let index = [];

        for (let j = 0; j < total; j++) {
          index.push(j + 1 + i * total);
        }
        count.push(index);
      }

      setCounter(count);
    }
  }, [dataVaksinasi]);

  return (
    <>
      <div class="container text-center mt-5">
        <div class="mb-3 w-25 py-5">
          <label for="date" class="form-label text-start">
            Date
          </label>
          <input
            class="form-control"
            onChange={(e) => setdateInput(e.target.value)}
            type="date"
            id="date"
          />
        </div>

        <div class="row row-cols-3">
          {counter.map((counters) => {
            return (
              <>
                <div class="col">
                  <div class="card" style={{ width: "18rem" }}>
                    <div class="card-body">
                      <h5 class="card-title">Session 1</h5>
                      {counters.map((e) => {
                        console.log(countVaksinasi.data);
                        return (
                          <>
                            <button
                              className={`btn border-5 border-secondary border-red ms-1 ${
                                e <= countVaksinasi.data ? "border-success" : ""
                              } ${
                                e === countVaksinasi.data + 1
                                  ? "bg-primary"
                                  : ""
                              }`}
                            >
                              {e}
                            </button>
                          </>
                        );
                      })}
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

export default DetailTempat;
