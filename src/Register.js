import React from 'react';
import { useForm } from 'react-hook-form';
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

const countries = ['USA', 'India']; 
const states = {
  USA: ['New York', 'California'],
  India: ['Madhya Pradesh', 'Maharashtra']
}; 
const cities = {
  'New York': ['New York City', 'Buffalo'],
  'California': ['Los Angeles', 'San Francisco'],
  'Madhya Pradesh': ['Bhopal', 'Gwalior'],
  'Maharashtra': ['Mumbai', 'Pune']
}; 

const RegistrationForm = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); 


  const onSubmit = (data) => {


    axios.post(`${process.env.REACT_APP_URI}/v1/api/register`, data)
    .then((response) => {
      navigate(`profile/${response.data.data._id}`)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const selectedCountry = watch('country');
  const selectedState = watch('state');

  return (
    <div className="container">
        <h1 className="text-center mt-5">Registration Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
            {...register('firstName', { required: true, pattern: /^[A-Za-z]+$/ })}
            className="form-control"
            />
            {errors.firstName && (
            <span className="text-danger">Please enter a valid first name</span>
            )}
        </div>

        <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
            {...register('lastName', { required: true, pattern: /^[A-Za-z]+$/ })}
            className="form-control"
            />
            {errors.lastName && (
            <span className="text-danger">Please enter a valid last name</span>
            )}
        </div>

        <div className="mb-3">
            <label className="form-label">E-Mail</label>
            <input
            {...register('email', {
                required: true,
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,4}$/,
            })}
            className="form-control"
            />
            {errors.email && (
            <span className="text-danger">Please enter a valid email</span>
            )}
        </div>

        <div className="mb-3">
            <label className="form-label">Country</label>
            <select {...register('country', { required: true })} className="form-select">
            <option value="">Select Country</option>
            {countries.map((country) => (
                <option key={country} value={country}>
                {country}
                </option>
            ))}
            </select>
            {errors.country && (
            <span className="text-danger">Please select a country</span>
            )}
        </div>

        <div className="mb-3">
            <label className="form-label">State</label>
            <select {...register('state', { required: true })} className="form-select" disabled={!selectedCountry}>
            <option value="">Select State</option>
            {states[selectedCountry]?.map((state) => (
                <option key={state} value={state}>
                {state}
                </option>
            ))}
            </select>
            {errors.state && (
            <span className="text-danger">Please select a state</span>
            )}
        </div>

        <div className="mb-3">
            <label className="form-label">City</label>
            <select {...register('city', { required: true })} className="form-select" disabled={!selectedCountry || !selectedState}>
            <option value="">Select City</option>
            {cities[selectedState]?.map((city) => (
                <option key={city} value={city}>
                {city}
                </option>
            ))}
            </select>
            {errors.city && (
            <span className="text-danger">Please select a state</span>
            )}
        </div>

        <div className="mb-3">
            <label className="form-label">Gender</label>
            <div>
            <input
                type="radio"
                id="male"
                value="male"
                {...register('gender', { required: true })}
                className="form-check-input"
            />
            <label htmlFor="male" className="form-check-label">
                Male
            </label>

            <input
                type="radio"
                id="female"
                value="female"
                {...register('gender', { required: true })}
                className="form-check-input"
            />
            <label htmlFor="female" className="form-check-label">
                Female
            </label>

            <input
                type="radio"
                id="other"
                value="other"
                {...register('gender', { required: true })}
                className="form-check-input"
            />
            <label htmlFor="other" className="form-check-label">
                Other
            </label>
            </div>
            {errors.gender && (
            <span className="text-danger">Please select a gender</span>
            )}
        </div>

        <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
            type="date"
            {...register('dob', {
                required: true,
                validate: (value) => new Date().getFullYear() - new Date(value).getFullYear() > 14,
            })}
            className="form-control"
            />
            {errors.dob && (
            <span className="text-danger">Must be older than 14 years</span>
            )}
        </div>

        <div className="mb-3">
            <label className="form-label">Age</label>
            <input
            type="text"
            value={watch('dob') ? new Date().getFullYear() - new Date(watch('dob')).getFullYear() : ''}
            readOnly
            className="form-control"
            />
        </div>

        <button type="submit" className="btn btn-primary">
            Submit
        </button>
        </form>
    </div>
  );
};

export default RegistrationForm;
