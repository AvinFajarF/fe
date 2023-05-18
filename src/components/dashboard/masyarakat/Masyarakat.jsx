import React from "react";
import "./style.css";

function Masyarakat() {
  return (
    <>
      <div className="header">
        <h1>Dashboard Masyarakat</h1>
      </div>

      <div className="container">
        <div class="card" style={{ width: "18rem" }}>
          <h5 class="card-title card-header">Consultasion</h5>
          <div class="card-body">
            <a href="#" class="card-link text-decoration-none">
              <i class="bi bi-plus"></i> Request Consultasion
            </a>
          </div>
        </div>

        <h1 className="mt-5 text-secondary">My Vaccinations</h1>
        <div class="alert alert-warning mt-3" role="alert">
  Your Consultasion must be accepted by doctor to get the doctor
</div>


<h1 className="py-5">
    My Consultasion
</h1>

<div class="card" style={{ width: "18rem" }}>
  <div class="card-header">
    Consultasion
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item d-flex ">
      Status <span style={{ display: "inline-block" }} className="ms-auto badge text-bg-secondary">Accept</span>
    </li>
    <li class="list-group-item d-flex">
      Disase History <span style={{ display: "inline-block" }} className="ms-auto">Accept</span>
    </li>
    <li class="list-group-item d-flex">
      Current<span style={{ display: "inline-block" }} className="ms-auto">Accept</span>
    </li>
    <li class="list-group-item d-flex">
      Doctor Name <span style={{ display: "inline-block" }} className="ms-auto">Accept</span>
    </li>
    <li class="list-group-item d-flex">
      Doctor Notes <span style={{ display: "inline-block" }} className="ms-auto">Accept</span>
    </li>
  </ul>
</div>


<div class="card mt-5" style={{ width: "18rem" }}>
          <h5 class="card-title card-header">Registasion Vaccination</h5>
          <div class="card-body">
            <a href="#" class="card-link text-decoration-none">
              <i class="bi bi-plus"></i> Request Vacination
            </a>
          </div>
        </div>


      </div>



      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </>
  );
}

export default Masyarakat;
