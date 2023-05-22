import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Consultasion() {
    // get token in local storage
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    console.log(token);
    // use state
    const [currentSymptoms, setCurrentSymptoms] = useState('');
    const [diseaseHistory, setDiseaseHistory] = useState('');


    const handleConsultasion = () => {

        axios.post('http://localhost:8000/api/v1/consultation', {
            token: token,
            current_symptoms: currentSymptoms,
            disease_history: diseaseHistory
        }).then(e => {
            console.log(e);
        }).catch((e) => {
            console.log(e);
        })
    }


    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    },[])

  return (
    <>
        

        <div class="card mx-auto mt-5" style={{ width: "18rem" }}>
        <div class="card-body">
          <form
            method="post"
            onSubmit={(e) => {
                e.preventDefault();
                handleConsultasion();

            }}
          >
            <div class="mb-3">
              <label for="currentSymptoms" class="form-label">
              CurrentSymptoms
              </label>
              <input
                type="text"
                name="currentSymptoms"
                class="form-control"
                id="currentSymptoms"
                onChange={(e) => setCurrentSymptoms(e.target.value)}
                aria-describedby="currentSymptoms"
              />
            </div>
            <div class="mb-3">
              <label for="diseaseHistory" class="form-label">
              DiseaseHistory
              </label>
              <input
                type="text"
                name='diseaseHistory'
                onChange={(e) => setDiseaseHistory(e.target.value)}
                class="form-control"
                id="diseaseHistory"
              />
            </div>
            <input type="text" value={token} hidden/>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>



    </>
  )
}

export default Consultasion