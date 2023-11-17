import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'


const Profile = () => {
  const { userId } = useParams();
  const [data, setData] =  useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URI}/v1/api/profile/${userId}`)
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [userId]);

  return (
    <div className='text-center mt-5'>
      <h1>Profile</h1>
      <pre>
        {JSON.stringify(data, undefined, 2)}
      </pre>
    </div>
  )
}

export default Profile