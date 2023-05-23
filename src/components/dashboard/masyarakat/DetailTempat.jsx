import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'

function DetailTempat() {

    const {id} = useParams()
    const token = localStorage.getItem('token')

    const date = new Date();
    const Year = date.getFullYear();
    const Month = date.getMonth();
    const Day = date.getDate();
    const dates =  `${Year}-${Month}-${Day}`
    console.log(dates);

    // const getSpecificSpot = async () => {
    //     await axios
    //       .get(`http://localhost:8000/api/v1/spots/${id}`, {
    //         params: { token: token },
    //       })
    //       .then((res) => {
    //         console.log(res.data);
    //       });
    //   };

    //   getSpecificSpot()

  return (
    <>
    
    <input type="date" id="date" class="form-control" aria-describedby="date"></input>
    
    </>
  )
}

export default DetailTempat